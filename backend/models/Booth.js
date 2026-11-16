const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  boothNumber: { type: String, required: true },
  category: { type: String, enum: ['Standard','Premium','Deluxe','Corner'], default: 'Standard' },
  price: { type: Number, default: 0 },
  size: String,
  status: { type: String, enum: ['available','reserved','occupied'], default: 'available' },
  position: { row: Number, col: Number },
  exhibitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Exhibitor' },
}, { timestamps: true });

schema.index({ event: 1, boothNumber: 1 }, { unique: true });

module.exports = mongoose.model('Booth', schema);