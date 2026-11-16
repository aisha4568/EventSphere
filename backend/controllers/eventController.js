const Event = require('../models/Event');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  const { search, city, category, page = 1, limit = 9, sort = '-startDate', published } = req.query;
  const filter = {};
  if (published !== 'false') filter.isPublished = true;
  if (search) filter.title = { $regex: search, $options: 'i' };
  if (city) filter.city = city;
  if (category) filter.category = category;

  const skip = (Number(page) - 1) * Number(limit);
  const [events, total] = await Promise.all([
    Event.find(filter).sort(sort).skip(skip).limit(Number(limit)),
    Event.countDocuments(filter),
  ]);

  res.json(new ApiResponse(200, {
    events, total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  }));
});

exports.getOne = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new ApiError(404, 'Event not found');
  res.json(new ApiResponse(200, event));
});

exports.create = asyncHandler(async (req, res) => {
  const event = await Event.create({ ...req.body, organizer: req.user._id });
  res.status(201).json(new ApiResponse(201, event, 'Event created'));
});

exports.update = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!event) throw new ApiError(404, 'Event not found');
  res.json(new ApiResponse(200, event, 'Event updated'));
});

exports.remove = asyncHandler(async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json(new ApiResponse(200, {}, 'Event deleted'));
});