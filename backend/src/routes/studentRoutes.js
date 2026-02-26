const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const Enrollment = require("../models/Enrollment");
const Certificate = require("../models/Certificate");
const QuizResult = require("../models/QuizResult");

const router = express.Router();

// GET /students/enrollments
router.get("/enrollments", authenticate, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate("course");
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch enrollments" });
  }
});

// GET /students/certificates
router.get("/certificates", authenticate, async (req, res) => {
  try {
    const certificates = await Certificate.find({ student: req.user.id });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch certificates" });
  }
});

// GET /students/quizzes
router.get("/quizzes", authenticate, async (req, res) => {
  try {
    const quizzes = await QuizResult.find({ student: req.user.id })
      .populate("courseId");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

module.exports = router;

// const express = require('express');
// import { authMiddleware } from "../middleware/auth.js";
// import Enrollment from "../models/Enrollment.js";
// import Certificate from "../models/Certificate.js";
// import QuizResult from "../models/QuizResult.js";

// const router = express.Router();

// // GET /students/enrollments
// router.get("/enrollments", authMiddleware, async (req, res) => {
//   try {
//     const enrollments = await Enrollment.find({ student: req.user.id })
//       .populate("course");
//     res.json(enrollments);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch enrollments" });
//   }
// });

// // GET /students/certificates
// router.get("/certificates", authMiddleware, async (req, res) => {
//   try {
//     const certificates = await Certificate.find({ student: req.user.id });
//     res.json(certificates);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch certificates" });
//   }
// });

// // GET /students/quizzes
// router.get("/quizzes", authMiddleware, async (req, res) => {
//   try {
//     const quizzes = await QuizResult.find({ student: req.user.id })
//       .populate("courseId");
//     res.json(quizzes);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch quizzes" });
//   }
// });

// export default router;