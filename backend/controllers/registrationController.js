const AttendeeRegistration = require('../models/AttendeeRegistration');
const Event = require('../models/Event');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { notify } = require('../services/socketService');

exports.register = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.body.eventId);
  if (!event) throw new ApiError(404, 'Event not found');
  if (!event.isPublished) throw new ApiError(400, 'Event not published');
  if (event.registrationDeadline && new Date() > event.registrationDeadline)
    throw new ApiError(400, 'Registration deadline passed');

  const existing = await AttendeeRegistration.findOne({ user: req.user._id, event: event._id });
  if (existing && existing.status === 'registered')
    throw new ApiError(400, 'Already registered');

  const reg = existing
    ? await AttendeeRegistration.findByIdAndUpdate(existing._id, { status: 'registered' }, { new: true })
    : await AttendeeRegistration.create({ user: req.user._id, event: event._id });

  await Event.findByIdAndUpdate(event._id, { $inc: { 'stats.attendeeCount': 1 } });
  await notify(req.user._id, 'Registration Confirmed',
    `You registered for ${event.title}. Ticket: ${reg.ticketCode}`, 'success');

  res.status(201).json(new ApiResponse(201, reg, 'Registered'));
});

exports.myRegistrations = asyncHandler(async (req, res) => {
  const regs = await AttendeeRegistration.find({ user: req.user._id })
    .populate('event', 'title startDate endDate city venue banner category')
    .sort('-createdAt');
  res.json(new ApiResponse(200, regs));
});

exports.cancel = asyncHandler(async (req, res) => {
  const reg = await AttendeeRegistration.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { status: 'cancelled' }, { new: true }
  );
  if (!reg) throw new ApiError(404, 'Registration not found');
  await Event.findByIdAndUpdate(reg.event, { $inc: { 'stats.attendeeCount': -1 } });
  res.json(new ApiResponse(200, reg, 'Registration cancelled'));
});

exports.listAll = asyncHandler(async (req, res) => {
  const regs = await AttendeeRegistration.find()
    .populate('user', 'name email')
    .populate('event', 'title')
    .sort('-createdAt').limit(200);
  res.json(new ApiResponse(200, regs));
});