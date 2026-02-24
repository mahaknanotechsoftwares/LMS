const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const Payment = require('../models/Payment');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Revenue report
router.get('/revenue', authenticate, authorize('admin'), async (req, res) => {
  const revenue = await Payment.aggregate([
    { $match: { status: 'success' } },
    { $group: { _id: null, totalRevenue: { $sum: '$amount' }, count: { $sum: 1 } } }
  ]);
  res.json(revenue[0] || { totalRevenue: 0, count: 0 });
});

// Student progress
router.get('/student-progress/:studentId', authenticate, authorize('admin', 'support'), async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.params.studentId }).populate('course', 'title');
  res.json(enrollments.map(e => ({ course: e.course.title, progress: e.progress, completed: e.completed })));
});

// Instructor performance
router.get('/instructor-performance/:instructorId', authenticate, authorize('admin'), async (req, res) => {
  const courses = await Course.find({ instructor: req.params.instructorId });
  const courseIds = courses.map(c => c._id);
  const enrollments = await Enrollment.find({ course: { $in: courseIds } });

  res.json({
    totalCourses: courses.length,
    totalEnrollments: enrollments.length
  });
});

module.exports = router;