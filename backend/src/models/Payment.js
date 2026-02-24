const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  amount: { type: Number, required: true },
  gateway: { type: String, enum: ['Stripe', 'Razorpay', 'PayPal'], required: true },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  transactionId: String,
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);