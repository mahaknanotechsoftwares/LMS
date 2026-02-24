const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Enrollment = require('../models/Enrollment');
const { issueCertificate } = require('../services/certificateServices');
const { authenticate } = require('../middleware/authMiddleware');

// Fake payment endpoint
router.post('/mock', authenticate, async (req, res) => {
  try {
    const { courseId, amount } = req.body;

    // Save fake payment
    const payment = new Payment({
      student: req.user._id,
      course: courseId,
      amount,
      gateway: 'MockGateway',
      status: 'success',
      transactionId: `mock_${Date.now()}`
    });
    await payment.save();

    // Create enrollment
    await Enrollment.findOneAndUpdate(
      { student: req.user._id, course: courseId },
      { $set: { progress: 0, completed: true } },
      { upsert: true }
    );

    // Auto issue certificate
    const certificate = await issueCertificate(req.user._id, courseId);

    res.json({
      message: 'Mock payment successful, certificate issued',
      certificate
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;