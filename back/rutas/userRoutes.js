const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Registro de usuario
router.post('/register', userController.register);

// Inicio de sesión
router.post('/login', userController.login);

// Perfil de usuario
router.get('/profile', userController.profile);

// Actualizar usuario
router.put('/update/:id', userController.updateUser);

module.exports = router;
