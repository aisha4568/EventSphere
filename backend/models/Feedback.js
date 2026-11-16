const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  rating: { type: Number, min: 1, max: 5, required: true },
  category: { type: String, enum: ['general','bug','suggestion','issue'], default: 'general' },
  message: { type: String, required: true },
  status: { type: String, enum: ['open','in-progress','resolved'], default: 'open' },
  adminReply: String,
}, { timestamps: true });
module.exports = mongoose.model('Feedback', schema);