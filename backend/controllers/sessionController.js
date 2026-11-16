const Session = require('../models/Session');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.byEvent = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ event: req.params.eventId })
    .populate('speaker', 'name photo title company')
    .sort('startTime');
  res.json(new ApiResponse(200, sessions));
});

exports.list = asyncHandler(async (req, res) => {
  const sessions = await Session.find()
    .populate('speaker', 'name photo')
    .populate('event', 'title')
    .sort('startTime');
  res.json(new ApiResponse(200, sessions));
});

exports.create = asyncHandler(async (req, res) => {
  const s = await Session.create(req.body);
  res.status(201).json(new ApiResponse(201, s, 'Session created'));
});

exports.update = asyncHandler(async (req, res) => {
  const s = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!s) throw new ApiError(404, 'Session not found');
  res.json(new ApiResponse(200, s, 'Session updated'));
});

exports.remove = asyncHandler(async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.json(new ApiResponse(200, {}, 'Session deleted'));
});