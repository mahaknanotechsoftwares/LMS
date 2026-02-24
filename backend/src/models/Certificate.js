const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const certificateSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  certificateId: { type: String, default: uuidv4 },
  issuedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);