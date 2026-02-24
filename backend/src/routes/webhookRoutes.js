const express = require('express');
const router = express.Router();
const { stripe, razorpay, paypal } = require('../config/payment');
const Payment = require('../models/Payment');
const Enrollment = require('../models/Enrollment');
const { issueCertificate } = require('../services/certificateServices');

//
// STRIPE WEBHOOK
//
router.post(
  '/stripe',
  express.raw({ type: 'application/json' }), // Stripe requires raw body
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const payment = await Payment.findOneAndUpdate(
        { transactionId: session.id },
        { status: 'success' },
        { new: true }
      );

      if (payment) {
        await Enrollment.findOneAndUpdate(
          { student: payment.student, course: payment.course },
          { $set: { progress: 0, completed: false } },
          { upsert: true }
        );

        try {
          await issueCertificate(payment.student, payment.course);
        } catch (err) {
          console.log('Certificate not issued yet:', err.message);
        }
      }
    }

    res.json({ received: true });
  }
);

//
// RAZORPAY WEBHOOK
//
router.post('/razorpay', express.json(), async (req, res) => {
  const payload = req.body;

  if (payload.event === 'payment.captured') {
    const paymentId = payload.payload.payment.entity.id;

    const payment = await Payment.findOneAndUpdate(
      { transactionId: paymentId },
      { status: 'success' },
      { new: true }
    );

    if (payment) {
      await Enrollment.findOneAndUpdate(
        { student: payment.student, course: payment.course },
        { $set: { progress: 0, completed: false } },
        { upsert: true }
      );

      try {
        await issueCertificate(payment.student, payment.course);
      } catch (err) {
        console.log('Certificate not issued yet:', err.message);
      }
    }
  }

  res.json({ received: true });
});

//
// PAYPAL WEBHOOK
//
router.post('/paypal', express.json(), async (req, res) => {
  const event = req.body;

  if (event.event_type === 'PAYMENT.SALE.COMPLETED') {
    const saleId = event.resource.id;

    const payment = await Payment.findOneAndUpdate(
      { transactionId: saleId },
      { status: 'success' },
      { new: true }
    );

    if (payment) {
      await Enrollment.findOneAndUpdate(
        { student: payment.student, course: payment.course },
        { $set: { progress: 0, completed: false } },
        { upsert: true }
      );

      try {
        await issueCertificate(payment.student, payment.course);
      } catch (err) {
        console.log('Certificate not issued yet:', err.message);
      }
    }
  }

  res.json({ received: true });
});

module.exports = router;