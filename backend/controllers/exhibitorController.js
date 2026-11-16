const Exhibitor = require('../models/Exhibitor');
const ExhibitorApplication = require('../models/ExhibitorApplication');
const Event = require('../models/Event');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { notify } = require('../services/socketService');

exports.list = asyncHandler(async (req, res) => {
  const { search, category, page = 1, limit = 12 } = req.query;
  const filter = {};
  if (search) filter.companyName = { $regex: search, $options: 'i' };
  if (category) filter.category = category;
  const skip = (Number(page) - 1) * Number(limit);
  const [exhibitors, total] = await Promise.all([
    Exhibitor.find(filter).populate('user', 'name email phone').skip(skip).limit(Number(limit)),
    Exhibitor.countDocuments(filter),
  ]);
  res.json(new ApiResponse(200, { exhibitors, total, pages: Math.ceil(total / Number(limit)) }));
});

exports.getOne = asyncHandler(async (req, res) => {
  const ex = await Exhibitor.findById(req.params.id).populate('user', 'name email phone');
  if (!ex) throw new ApiError(404, 'Exhibitor not found');
  res.json(new ApiResponse(200, ex));
});

exports.getMyProfile = asyncHandler(async (req, res) => {
  const ex = await Exhibitor.findOne({ user: req.user._id }).populate('user', 'name email phone');
  res.json(new ApiResponse(200, ex));
});

exports.updateMyProfile = asyncHandler(async (req, res) => {
  const ex = await Exhibitor.findOneAndUpdate({ user: req.user._id }, req.body, { new: true, runValidators: true });
  res.json(new ApiResponse(200, ex, 'Profile updated'));
});

exports.apply = asyncHandler(async (req, res) => {
  const ex = await Exhibitor.findOne({ user: req.user._id });
  if (!ex) throw new ApiError(400, 'Create your company profile first');
  const { eventId } = req.body;
  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, 'Event not found');

  const existing = await ExhibitorApplication.findOne({ exhibitor: ex._id, event: eventId });
  if (existing) throw new ApiError(400, 'Already applied for this event');

  const app = await ExhibitorApplication.create({ exhibitor: ex._id, event: eventId, message: req.body.message });
  await notify(event.organizer, 'New Exhibitor Application', `${ex.companyName} applied for ${event.title}`, 'info');
  res.status(201).json(new ApiResponse(201, app, 'Application submitted'));
});

exports.myApplications = asyncHandler(async (req, res) => {
  const ex = await Exhibitor.findOne({ user: req.user._id });
  const apps = await ExhibitorApplication.find({ exhibitor: ex?._id }).populate('event', 'title startDate city venue');
  res.json(new ApiResponse(200, apps));
});

exports.listApplications = asyncHandler(async (req, res) => {
  const apps = await ExhibitorApplication.find()
    .populate('exhibitor', 'companyName category logo')
    .populate('event', 'title')
    .sort('-createdAt');
  res.json(new ApiResponse(200, apps));
});

exports.updateApplication = asyncHandler(async (req, res) => {
  const { status, adminNote } = req.body;
  const app = await ExhibitorApplication.findByIdAndUpdate(
    req.params.id, { status, adminNote }, { new: true }
  ).populate('exhibitor event');
  if (!app) throw new ApiError(404, 'Application not found');

  await notify(app.exhibitor.user, 'Application Update',
    `Your application for ${app.event.title} was ${status}`, status === 'approved' ? 'success' : 'error');

  res.json(new ApiResponse(200, app, 'Application updated'));
});