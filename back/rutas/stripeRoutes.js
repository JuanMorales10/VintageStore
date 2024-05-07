const express = require('express');
const router = express.Router();
const stripeController = require('../controller/stripeController')

router.post('/', stripeController.makePayment)

module.exports = router;