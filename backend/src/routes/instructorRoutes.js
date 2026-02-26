const express = require("express");
const { protect, instructorOnly } = require("../middleware/authMiddleware"); 
const Course = require("../models/Course");

const router = express.Router();

// POST /api/instructor/courses → Create a new course
router.post("/courses", protect, instructorOnly, async (req, res) => {
  try {
    const { title, description, price, thumbnail } = req.body;

    const course = await Course.create({
      title,
      description,
      price,
      thumbnail,
      instructor: req.user.id,
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to create course" });
  }
});

// GET /api/instructor/courses → List instructor’s courses
router.get("/courses", protect, instructorOnly, async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// PUT /api/instructor/courses/:id → Update a course
router.put("/courses/:id", protect, instructorOnly, async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, instructor: req.user.id },
      req.body,
      { new: true }
    );
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to update course" });
  }
});

// DELETE /api/instructor/courses/:id → Delete a course
router.delete("/courses/:id", protect, instructorOnly, async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      instructor: req.user.id,
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete course" });
  }
});

module.exports = router;