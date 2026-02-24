const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Instructor creates course
router.post('/', authenticate, authorize('instructor'), async (req, res) => {
  try {
    const course = new Course({ ...req.body, instructor: req.user._id });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin approves course
router.put('/:id/approve', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      const error = new Error('Course not found');
      error.statusCode = 404;
      throw error; // automatically caught by errorHandler
    }

    course.approved = true;
    await course.save();
    res.json({ message: 'Course approved', course });
  } catch (err) {
    next(err); // pass error to errorHandler
  }
});

module.exports = router;
