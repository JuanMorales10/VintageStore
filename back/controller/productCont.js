const db = require('../database/models'); // Asumiendo que usas Sequelize y tienes tus modelos configurados

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await db.Producto.findAll();
            res.send(products);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    
    getProductsByCategory: async (req, res) => {
        try {
            const categoriaId = req.params.categoriaId;
            const categoria = await db.Categoria.findByPk(categoriaId, {
                include: [{
                    model: db.Categoria,
                    as: 'subcategorias',
                    include: [{
                        model: db.Producto,
                        as: 'productos'
                    }]
                }]
            });

            let productos = [];
            if (categoria) {
                // Añadir productos de la categoría principal
                const productosPrincipales = await db.Producto.findAll({
                    where: { id_categoria: categoriaId }
                });
                productos = productos.concat(productosPrincipales);

                // Añadir productos de las subcategorías
                categoria.subcategorias.forEach(subcategoria => {
                    productos = productos.concat(subcategoria.productos);
                });
            }
            res.json(productos);
        } catch (error) {
            console.error('Error al obtener productos por categoría:', error);
            res.status(500).send(error);
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await db.Producto.findByPk(req.params.id);
            if (product) {
                res.send(product);
            } else {
                res.status(404).send({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },

    createProduct: async (req, res) => {
        try {
            const product = await db.Producto.create(req.body);
            res.status(201).send(product);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await db.Producto.findByPk(req.params.id);
            if (product) {
                await product.update(req.body);
                res.send({ message: 'Product updated', product });
            } else {
                res.status(404).send({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await db.Producto.findByPk(req.params.id);
            if (product) {
                await product.destroy();
                res.send({ message: 'Product deleted' });
            } else {
                res.status(404).send({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = productController;
