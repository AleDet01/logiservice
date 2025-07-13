const mongoose = require('mongoose');

const consultationRequestSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  companySize: { type: String },
  location: { type: String },
  message: { type: String },
  status: { type: String, enum: ['new', 'in_progress', 'completed'], default: 'new' },
  requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consultation', consultationRequestSchema, 'Consultations');
