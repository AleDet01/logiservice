const mongoose = require('mongoose');

const consultationRequestSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  company: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  companySize: { type: String },
  currentSituation: { type: String },
  specificNeeds: { type: String },
  location: { type: String },
  message: { type: String },
  status: { type: String, enum: ['new', 'in_progress', 'completed'], default: 'new' },
  requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consultation', consultationRequestSchema, 'Consultations');
