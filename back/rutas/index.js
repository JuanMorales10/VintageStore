const express = require('express');
const router = express.Router();
const stripeRoutes = require('./stripeRoutes')
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const orderRoutes = require('./orderRoutes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categorias', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/checkout', stripeRoutes)

module.exports = router;
