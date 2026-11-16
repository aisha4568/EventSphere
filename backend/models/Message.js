const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: String,
  body: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('Message', schema);