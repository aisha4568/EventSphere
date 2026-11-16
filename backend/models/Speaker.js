const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  bio: String,
  photo: String,
  company: String,
  socials: { linkedin: String, twitter: String },
}, { timestamps: true });
module.exports = mongoose.model('Speaker', schema);