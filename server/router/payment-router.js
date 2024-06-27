const express = require('express');
const paymentController = require('../controllers/payment-controller');
const router = express.Router();

router.post('/order').get(paymentController.createOrder);
router.post('/verify').get(paymentController.verifyPayment);

module.exports = router;
