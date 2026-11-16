const Feedback = require('../models/Feedback');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.create = asyncHandler(async (req, res) => {
  const fb = await Feedback.create({ ...req.body, user: req.user._id });
  res.status(201).json(new ApiResponse(201, fb, 'Feedback submitted'));
});

exports.list = asyncHandler(async (req, res) => {
  const items = await Feedback.find()
    .populate('user', 'name email')
    .populate('event', 'title')
    .sort('-createdAt');
  res.json(new ApiResponse(200, items));
});

exports.myFeedback = asyncHandler(async (req, res) => {
  const items = await Feedback.find({ user: req.user._id })
    .populate('event', 'title')
    .sort('-createdAt');
  res.json(new ApiResponse(200, items));
});

exports.update = asyncHandler(async (req, res) => {
  const fb = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(new ApiResponse(200, fb, 'Feedback updated'));
});