const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { issueCertificate } = require('../services/certificateServices');
const Certificate = require('../models/Certificate');

// Issue certificate
router.post('/issue', authenticate, async (req, res) => {
  try {
    const { courseId } = req.body;
    const certificate = await issueCertificate(req.user._id, courseId);
    res.status(201).json({ message: 'Certificate issued', certificate });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Verify certificate
router.get('/verify/:id', async (req, res, next) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id })
      .populate('student', 'name email')
      .populate('course', 'title');

    if (!certificate) {
      const error = new Error('Certificate not found');
      error.statusCode = 404;
      throw error;
    }

    res.json(certificate);
  } catch (err) {
    next(err);
  }
});

module.exports = router;