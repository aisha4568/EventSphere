const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
}, { timestamps: true });
schema.index({ user: 1, session: 1 }, { unique: true });
module.exports = mongoose.model('Bookmark', schema);