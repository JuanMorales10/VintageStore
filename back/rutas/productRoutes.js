const express = require('express');
const router = express.Router();
const productController = require('../controller/productCont');
const ProductImages = require('../middleware/ProcessProductImages');

// Listar todos los productos
router.get('/', productController.getAllProducts);

// Listar productos solo por categoría
router.get('/categoria/:categoriaId', productController.getProductsByCategory);

// Listar productos por categoría y subcategoría usando el ID
router.get('/categoria/:categoriaId/subcategoria/:subcategoriaId', productController.getProductsBySubcategory);

// Nueva ruta para obtener los últimos productos
router.get('/latest', productController.getLatestProducts);

// Detalle de un producto
router.get('/:id', productController.getProductById);

// Crear un producto
router.post('/', ProductImages, productController.createProduct);

// Actualizar un producto
router.put('/:id', ProductImages, productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

// Ruta para eliminar una imagen específica
router.delete('/images/:imageId', productController.deleteImage);


module.exports = router;

