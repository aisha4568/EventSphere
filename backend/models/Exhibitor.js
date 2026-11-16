const mongoose = require('mongoose');

const exhibitorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  companyName: { type: String, required: true, index: true },
  logo: String,
  description: { type: String, required: true },
  category: { type: String, required: true },
  products: [String],
  email: String,
  phone: String,
  website: String,
  address: String,
  city: String,
  socials: { facebook: String, linkedin: String, twitter: String, instagram: String },
  documents: [{ url: String, name: String }],
}, { timestamps: true });

module.exports = mongoose.model('Exhibitor', exhibitorSchema);