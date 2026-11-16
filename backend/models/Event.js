const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  theme: String,
  category: {
    type: String,
    enum: ['Technology','Business','Fashion','Healthcare','Education','E-Commerce','Startup','Other'],
    required: true,
  },
  banner: { type: String, default: '' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  registrationDeadline: Date,
  city: { type: String, required: true, index: true },
  venue: { type: String, required: true },
  address: String,
  capacity: { type: Number, default: 1000 },
  exhibitorCapacity: { type: Number, default: 100 },
  price: { type: Number, default: 0 },
  currency: { type: String, default: 'PKR' },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublished: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  stats: {
    attendeeCount: { type: Number, default: 0 },
    exhibitorCount: { type: Number, default: 0 },
  },
}, { timestamps: true });

eventSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();
  }
  next();
});

eventSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Event', eventSchema);