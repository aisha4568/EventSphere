const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  status: { type: String, enum: ['registered','cancelled'], default: 'registered' },
  ticketCode: { type: String, unique: true },
}, { timestamps: true });

schema.index({ user: 1, event: 1 }, { unique: true });

schema.pre('save', function (next) {
  if (!this.ticketCode) {
    this.ticketCode = 'ES-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('AttendeeRegistration', schema);