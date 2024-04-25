const express = require('express');
const router = express.Router();
const productController = require('../controller/productCont');
const ProductImages = require('../middleware/ProcessProductImages')

// Listar todos los productos
router.get('/', productController.getAllProducts);

// Detalle de un producto
router.get('/:id', productController.getProductById);

// Crear un producto
router.post('/', ProductImages.array('imagen') ,productController.createProduct);

// Actualizar un producto
router.put('/:id', ProductImages.array('imagen'), productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
