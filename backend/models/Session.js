const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  title: { type: String, required: true },
  description: String,
  speaker: { type: mongoose.Schema.Types.ObjectId, ref: 'Speaker' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  hall: String,
  track: String,
  capacity: Number,
}, { timestamps: true });
module.exports = mongoose.model('Session', schema);