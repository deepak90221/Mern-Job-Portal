const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require("../models/payment-model");

// Initialize Razorpay instance with key_id and key_secret
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, id } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id + "|" + id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: req.body.amount,
        id: req.body.id,
        secret_key: process.env.RAZORPAY_SECRET_KEY,
      });
      await payment.save();
      res.json({ message: 'Payment verified successfully', payment });
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createOrder, verifyPayment };
