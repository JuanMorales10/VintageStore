const db = require('../database/models');
const { validationResult } = require('express-validator');
const sharp = require('sharp')

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await db.Producto.findAll({
                include: [
                    { model: db.Categoria, as: 'categoria' },
                    { model: db.ProductImage, as: 'imagenes' }
                ],
                order: [
                    [{ model: db.Categoria, as: 'categoria' }, 'nombre', 'ASC'], // Ordena primero por el nombre de la categoría
                    ['nombre', 'ASC'] // Luego ordena por el nombre del producto
                ]
            });
            res.json(products);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    
    getProductById: async (req, res) => {
        try {
            const product = await db.Producto.findByPk(req.params.id, {
                include: [
                    { model: db.Categoria, as: 'categoria' },
                    { model: db.ProductImage, as: 'imagenes' }
                ]
            });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            console.log(product)
            res.json(product);
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteImage: async (req, res) => {
        const { imageId } = req.params;
        try {
            const image = await db.ProductImage.findByPk(imageId);
            if (!image) {
                return res.status(404).json({ message: 'Image not found' });
            }
            await image.destroy();
            res.status(200).json({ message: 'Image deleted successfully' });
        } catch (error) {
            console.error('Error deleting image:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
    getProductsByCategory : async (req, res) => {
        const { categoriaId } = req.params;
        try {
            const categoria = await db.Categoria.findByPk(categoriaId, {
                include: [{
                    model: db.Categoria,
                    as: 'subcategorias',
                    attributes: ['id_categoria', 'nombre', 'descripcion'] // Asegúrate de que estos campos existen en tu modelo
                }]
            });
    
            if (!categoria) {
                return res.status(404).json({ message: 'Category not found' });
            }
    
            const products = await db.Producto.findAll({
                where: { id_categoria: categoriaId },
                include: [
                    { model: db.ProductImage, as: 'imagenes' }
                ]
            });
    
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found for this category' });
            }

    
            const productsWithImages = products.map(product => ({
                id: product.id_producto,
                name: product.nombre,
                description: product.descripcion,
                price: product.precio,
                stock: product.stock,
                size: product.talla,
                images: product.imagenes.map(image => image.url),
                id_subcategoria: product.id_subcategoria
            }));
    
            res.json({
                categoryName: categoria.nombre,
                subcategories: categoria.subcategorias,
                products: productsWithImages
            });
        } catch (error) {
            console.error('Error al obtener productos por categoría:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    getProductsBySubcategory: async (req, res) => {
        const { categoriaId, subcategoriaId } = req.params;
    
        try {
            const categoria = await db.Categoria.findByPk(categoriaId);
            if (!categoria) {
                return res.status(404).json({ message: 'Category not found' });
            }
    
            const products = await db.Producto.findAll({
                where: {
                    id_categoria: categoriaId,
                    id_subcategoria: subcategoriaId
                },
                include: [
                    { model: db.ProductImage, as: 'imagenes' }
                ]
            });
    
            if (!products.length) {
                return res.status(404).json({ message: 'No products found in this subcategory' });
            }
    
            const productsWithImages = products.map(product => ({
                id: product.id_producto,
                name: product.nombre,
                description: product.descripcion,
                price: product.precio,
                images: product.imagenes.map(image => image.url)
            }));
    
            res.json({
                categoryName: categoria.nombre,
                products: productsWithImages
            });
        } catch (error) {
            console.error('Error fetching products by subcategory:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
    
    
    createProduct: async (req, res) => {

        // Extraer datos del cuerpo de la solicitud
        const { nombre, descripcion, precio, id_categoria, id_subcategoria, stock, talla } = req.body;
        
        // Crear un objeto con la data del producto
        const productData = {
            nombre,
            descripcion,
            precio,
            id_categoria,
            stock,
            talla,
            id_subcategoria: id_subcategoria || null // Si no hay subcategoria, establecer como null
        };

    
        try {
            // Validar que la categoría exista
            const categoria = await db.Categoria.findByPk(id_categoria);
            if (!categoria) {
                return res.status(400).json({ message: 'Categoría no encontrada' });
            }
    
            // Si se proporciona una subcategoría, validar que exista
            if (id_subcategoria) {
                const subcategoria = await db.Categoria.findByPk(id_subcategoria);
                if (!subcategoria || subcategoria.categoriaPadreId !== parseInt(id_categoria)) {
                    return res.status(400).json({ message: 'Subcategoría no encontrada o no coincide con la categoría' });
                }
            }
    
            // Crear producto con el objeto 'productData'
            const product = await db.Producto.create(productData);
    
            // Procesar múltiples imágenes si las hay
            if (req.files && req.files.length > 0) {
                const imagePromises = req.files.map(file => {
                    return db.ProductImage.create({
                        productId: product.id_producto,
                        url: file.filename // Asegúrate de que la URL sea accesible al cliente
                    });
                });
    
               // Esperar a que todas las imágenes se procesen
                await Promise.all(imagePromises);
            }
    
            // Si todo sale bien, enviar respuesta
            res.status(201).json({ message: 'Producto creado con éxito', product });
        } catch (error) {
            // Si algo sale mal, enviar error
            console.error('Error al crear el producto:', error);
            res.status(500).json({ error: 'Error interno del servidor', details: error.message });
        }
    },

    getLatestProducts: async (req, res) => {
        try {
            const latestProducts = await db.Producto.findAll({
                order: [['id_producto', 'DESC']], // Ordena por id_producto en orden descendente
                limit: 10, // Limita el resultado a los últimos 10 productos, puedes ajustar esto según tus necesidades
                include: [
                    { model: db.Categoria, as: 'categoria' },
                    { model: db.ProductImage, as: 'imagenes' }
                ]
            });
    
            if (latestProducts.length === 0) {
                return res.status(404).json({ message: 'No latest products found' });
            }
    
            const formattedLatestProducts = latestProducts.map(product => ({
                id: product.id_producto,
                name: product.nombre,
                description: product.descripcion,
                price: product.precio,
                stock: product.stock,
                size: product.talla,
                images: product.imagenes.map(image => image.url),
                category: {
                    id: product.categoria.id_categoria,
                    name: product.categoria.nombre,
                    description: product.categoria.descripcion,
                    parentId: product.categoria.categoriaPadreId // Si necesitas el ID de la categoría padre
                }
            }));
    
            res.json(formattedLatestProducts);
        } catch (error) {
            console.error('Error al obtener los últimos productos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
,    
      
    
    updateProduct: async (req, res) => {
        try {
            const product = await db.Producto.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const { nombre, descripcion, precio, id_categoria, stock, talla } = req.body;
            await product.update({
                nombre,
                descripcion,
                precio,
                id_categoria,
                stock,
                talla
            });

            res.json({ message: 'Producto actualizado con éxito', product });
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await db.Producto.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            // Eliminar todas las imágenes asociadas primero
            await db.ProductImage.destroy({ where: { productId: req.params.id } });
    
            // Después eliminar el producto
            await product.destroy();
            res.json({ message: 'Producto eliminado con éxito' });
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
    
};

module.exports = productController;

