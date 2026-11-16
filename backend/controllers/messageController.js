
const Message = require('../models/Message');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { pushToUser } = require('../services/socketService');
const { sendEmail } = require('../services/emailService');

exports.send = asyncHandler(async (req, res) => {
  const { receiverId, subject, body } = req.body;

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    throw new ApiError(404, 'Recipient not found');
  }

  const msg = await Message.create({
    sender: req.user._id,
    receiver: receiverId,
    subject,
    body,
  });

  // Real-time notification
  pushToUser(receiverId, 'message:new', msg);

  // Send email to receiver
  await sendEmail(
    receiver.email,
    subject || 'New Message from EventSphere',
    body
  );

  res.status(201).json(
    new ApiResponse(201, msg, 'Message sent successfully')
  );
});

exports.inbox = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    receiver: req.user._id
  })
    .populate('sender', 'name email role')
    .sort('-createdAt');

  res.json(new ApiResponse(200, messages));
});


exports.recipients = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Only admin can view recipients');
  }

  const users = await User.find({
    role: { $in: ['attendee', 'exhibitor'] }
  }).select('name email role');

  res.json(new ApiResponse(200, users));
});



exports.sent = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    sender: req.user._id
  })
    .populate('receiver', 'name email role')
    .sort('-createdAt');

  res.json(new ApiResponse(200, messages));
});
