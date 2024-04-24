const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// Crear un pedido
router.post('/', orderController.createOrder);

// Listar pedidos de un usuario
router.get('/user/:userId', orderController.getUserOrders);

// Detalle de un pedido
router.get('/:id', orderController.getOrderById);

module.exports = router;
