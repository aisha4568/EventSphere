const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Exhibitor = require('../models/Exhibitor');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { sendEmail } = require('../services/emailService');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

exports.register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  if (await User.findOne({ email })) throw new ApiError(400, 'Email already registered');
  if (!['admin','exhibitor','attendee'].includes(role)) throw new ApiError(400, 'Invalid role');

  // In production, only existing admins can create admin users
  const finalRole = role === 'admin' ? 'attendee' : role;

  const user = await User.create({ name, email, phone, password, role: finalRole });

  if (finalRole === 'exhibitor') {
    await Exhibitor.create({
      user: user._id,
      companyName: `${name}'s Company`,
      description: 'New exhibitor profile - please update.',
      category: 'Other',
      email, phone,
    });
  }

  const token = signToken(user._id);
  const safe = { _id: user._id, name: user.name, email: user.email, role: user.role };
  res.status(201).json(new ApiResponse(201, { user: safe, token }, 'Registered successfully'));
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid credentials');
  }
  const token = signToken(user._id);
  const safe = { _id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar };
  res.json(new ApiResponse(200, { user: safe, token }, 'Logged in'));
});

exports.getMe = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, req.user));
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json(new ApiResponse(200, {}, 'If email exists, reset link sent'));

  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
  user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const url = `${process.env.CLIENT_URL}/reset-password/${token}`;
  await sendEmail(user.email, 'EventSphere Password Reset', `Reset your password: ${url}`)
    .catch(err => console.log('Email failed:', err.message));

  res.json(new ApiResponse(200, {}, 'Reset link sent'));
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) throw new ApiError(400, 'Invalid or expired token');
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json(new ApiResponse(200, {}, 'Password reset successful'));
});