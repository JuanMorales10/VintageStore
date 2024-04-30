const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

// Listar todas las categorías principales
router.get('/', categoryController.getAllCategorias);

// Obtener subcategorías de una categoría específica
router.get('/:id_categoria/subcategorias', categoryController.getSubcategorias);

// Crear una nueva categoría
router.post('/', categoryController.createCategory);

module.exports = router;
