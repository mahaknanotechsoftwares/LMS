// const Stripe = require('stripe');
// const Razorpay = require('razorpay');
// const paypal = require('paypal-rest-sdk');

// const stripe = Stripe(process.env.STRIPE_SECRET);

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// paypal.configure({
//   mode: 'sandbox', // or 'live'
//   client_id: process.env.PAYPAL_CLIENT_ID,
//   client_secret: process.env.PAYPAL_CLIENT_SECRET,
// });

// module.exports = { stripe, razorpay, paypal };

// src/config/payment.js
// For demo purposes, we don't use real gateways

// Fake payment object just to avoid errors
const stripe = {};
const razorpay = {};
const paypal = {};

module.exports = { stripe, razorpay, paypal };