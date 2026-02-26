const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  quizTitle: String,
  score: Number,
  total: Number,
  attemptedAt: { type: Date, default: Date.now }
});
module.exports= mongoose.model("QuizResult", quizResultSchema);
