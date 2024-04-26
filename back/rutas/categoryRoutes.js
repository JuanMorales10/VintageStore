const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

// Listar todas las categorías
router.get('/', categoryController.getAllCategorias);

// Crear una nueva categoría
router.post('/', categoryController.createCategory);

module.exports = router;
