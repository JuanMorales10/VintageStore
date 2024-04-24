const express = require('express');
const router = express.Router();
const productController = require('../controller/productCont');

// Listar todos los productos
router.get('/', productController.getAllProducts);

// Detalle de un producto
router.get('/:id', productController.getProductById);

// Crear un producto
router.post('/', productController.createProduct);

// Actualizar un producto
router.put('/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
