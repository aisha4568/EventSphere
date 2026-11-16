const Notification = require('../models/Notification');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.mine = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort('-createdAt').limit(50);
  res.json(new ApiResponse(200, notifications));
});

exports.markRead = asyncHandler(async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json(new ApiResponse(200, {}, 'Marked read'));
});

exports.markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.user._id }, { isRead: true });
  res.json(new ApiResponse(200, {}, 'All marked read'));
});

exports.remove = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndDelete({ 
    _id: req.params.id, 
    user: req.user._id 
  });
  
  if (!notification) throw new ApiError(404, 'Notification not found');
  res.json(new ApiResponse(200, {}, 'Notification deleted'));
});