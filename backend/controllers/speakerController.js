const Speaker = require('../models/Speaker');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  const speakers = await Speaker.find().sort('-createdAt');
  res.json(new ApiResponse(200, speakers));
});

exports.create = asyncHandler(async (req, res) => {
  const s = await Speaker.create(req.body);
  res.status(201).json(new ApiResponse(201, s, 'Speaker added'));
});

exports.update = asyncHandler(async (req, res) => {
  const s = await Speaker.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!s) throw new ApiError(404, 'Speaker not found');
  res.json(new ApiResponse(200, s, 'Speaker updated'));
});

exports.remove = asyncHandler(async (req, res) => {
  await Speaker.findByIdAndDelete(req.params.id);
  res.json(new ApiResponse(200, {}, 'Speaker deleted'));
});