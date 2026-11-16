const Bookmark = require('../models/Bookmark');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.toggle = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  const existing = await Bookmark.findOne({ user: req.user._id, session: sessionId });
  if (existing) {
    await existing.deleteOne();
    return res.json(new ApiResponse(200, { bookmarked: false }, 'Bookmark removed'));
  }
  await Bookmark.create({ user: req.user._id, session: sessionId });
  res.json(new ApiResponse(200, { bookmarked: true }, 'Bookmark added'));
});

exports.mine = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ user: req.user._id })
    .populate({
      path: 'session',
      populate: [
        { path: 'speaker', select: 'name photo company' },
        { path: 'event', select: 'title city startDate' },
      ],
    });
  res.json(new ApiResponse(200, bookmarks));
});