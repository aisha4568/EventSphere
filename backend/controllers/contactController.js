const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.submit = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.create(req.body);
  res.status(201).json(new ApiResponse(201, msg, 'Message sent'));
});

exports.list = asyncHandler(async (req, res) => {
  const msgs = await ContactMessage.find().sort('-createdAt');
  res.json(new ApiResponse(200, msgs));
});

exports.subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    await NewsletterSubscriber.create({ email });
  } catch (e) { /* already exists - ignore */ }
  res.json(new ApiResponse(200, {}, 'Subscribed'));
});