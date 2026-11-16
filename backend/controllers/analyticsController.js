const Event = require('../models/Event');
const Exhibitor = require('../models/Exhibitor');
const User = require('../models/User');
const Booth = require('../models/Booth');
const AttendeeRegistration = require('../models/AttendeeRegistration');
const ExhibitorApplication = require('../models/ExhibitorApplication');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.dashboardStats = asyncHandler(async (req, res) => {
  const [totalEvents, upcoming, totalExhibitors, totalAttendees, booths] = await Promise.all([
    Event.countDocuments(),
    Event.countDocuments({ startDate: { $gte: new Date() } }),
    Exhibitor.countDocuments(),
    User.countDocuments({ role: 'attendee' }),
    Booth.find().select('status'),
  ]);

  const available = booths.filter(b => b.status === 'available').length;
  const reserved = booths.filter(b => b.status === 'reserved').length;
  const occupied = booths.filter(b => b.status === 'occupied').length;

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const trend = await AttendeeRegistration.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
    } },
    { $sort: { _id: 1 } },
  ]);

  const eventPerformance = await Event.find()
    .select('title stats')
    .sort('-stats.attendeeCount')
    .limit(5);

  const recentRegs = await AttendeeRegistration.find()
    .populate('user', 'name email')
    .populate('event', 'title')
    .sort('-createdAt')
    .limit(10);

  const recentApplications = await ExhibitorApplication.find()
    .populate('exhibitor', 'companyName logo')
    .populate('event', 'title')
    .sort('-createdAt')
    .limit(5);

  const upcomingEvents = await Event.find({ startDate: { $gte: new Date() } })
    .sort('startDate')
    .limit(5);

  res.json(new ApiResponse(200, {
    stats: {
      totalEvents, upcoming, totalExhibitors, totalAttendees,
      availableBooths: available, reservedBooths: reserved, occupiedBooths: occupied,
    },
    trend,
    eventPerformance,
    recentRegs,
    recentApplications,
    upcomingEvents,
  }));
});

exports.boothOccupancy = asyncHandler(async (req, res) => {
  const data = await Booth.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  res.json(new ApiResponse(200, data));
});

exports.registrationsByEvent = asyncHandler(async (req, res) => {
  const data = await AttendeeRegistration.aggregate([
    { $group: { _id: '$event', count: { $sum: 1 } } },
    { $lookup: { from: 'events', localField: '_id', foreignField: '_id', as: 'event' } },
    { $unwind: '$event' },
    { $project: { title: '$event.title', count: 1 } },
    { $sort: { count: -1 } },
    { $limit: 8 },
  ]);
  res.json(new ApiResponse(200, data));
});