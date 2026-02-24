const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessons: [{ title: String, videoUrl: String, resources: [String] }],
  price: { type: Number, required: true },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);