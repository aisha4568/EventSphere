const Booth = require('../models/Booth');
const BoothReservation = require('../models/BoothReservation');
const Exhibitor = require('../models/Exhibitor');
const Event = require('../models/Event');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { notify } = require('../services/socketService');

exports.byEvent = asyncHandler(async (req, res) => {
  const booths = await Booth.find({ event: req.params.eventId }).populate('exhibitor', 'companyName logo');
  res.json(new ApiResponse(200, booths));
});

exports.create = asyncHandler(async (req, res) => {
  const { eventId, booths } = req.body;
  const docs = booths.map(b => ({ ...b, event: eventId }));
  const created = await Booth.insertMany(docs);
  res.status(201).json(new ApiResponse(201, created, `${created.length} booths created`));
});

exports.reserve = asyncHandler(async (req, res) => {
  const ex = await Exhibitor.findOne({ user: req.user._id });
  if (!ex) throw new ApiError(400, 'Exhibitor profile required');

  const booth = await Booth.findById(req.body.boothId);
  if (!booth) throw new ApiError(404, 'Booth not found');
  if (booth.status !== 'available') throw new ApiError(400, 'Booth not available');

  const updated = await Booth.findOneAndUpdate(
    { _id: booth._id, status: 'available' },
    { status: 'reserved', exhibitor: ex._id },
    { new: true }
  );
  if (!updated) throw new ApiError(400, 'Booth was just taken');

  const reservation = await BoothReservation.create({
    booth: booth._id, exhibitor: ex._id, event: booth.event,
  });

  const event = await Event.findById(booth.event);
  if (event) {
    await notify(event.organizer, 'New Booth Reservation', `${ex.companyName} reserved booth ${booth.boothNumber}`, 'info');
  }

  res.status(201).json(new ApiResponse(201, reservation, 'Booth reserved'));
});

exports.myBooths = asyncHandler(async (req, res) => {
  const ex = await Exhibitor.findOne({ user: req.user._id });
  const reservations = await BoothReservation.find({ exhibitor: ex?._id })
    .populate('booth')
    .populate('event', 'title startDate');
  res.json(new ApiResponse(200, reservations));
});