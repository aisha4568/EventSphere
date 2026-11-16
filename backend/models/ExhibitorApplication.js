const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  exhibitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Exhibitor', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  message: String,
  documents: [{ url: String, name: String }],
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  adminNote: String,
}, { timestamps: true });

schema.index({ exhibitor: 1, event: 1 }, { unique: true });

// ✅ YEH LINE SABSE ZAROORI HAI
module.exports = mongoose.model('ExhibitorApplication', schema);