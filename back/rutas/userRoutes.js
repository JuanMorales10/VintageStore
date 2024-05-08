const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Rutas para el CRUD de usuarios
router.post('/', userController.createUser);
router.post('/login', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;

