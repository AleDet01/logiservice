const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['portapallet', 'cantilever', 'drive-in', 'mezzanina', 'altro'] },
  loadCapacityKg: Number,
  dimensions: {
    height: Number,
    width: Number,
    depth: Number
  },
  price: Number,
  description: String,
  images: [String],
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema, 'Products');
