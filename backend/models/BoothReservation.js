const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  booth: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth', required: true, unique: true },
  exhibitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Exhibitor', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  status: { type: String, enum: ['pending','confirmed','cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('BoothReservation', schema);