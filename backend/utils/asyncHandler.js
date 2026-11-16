const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ✅ Sahi tareeqa (Direct export)
module.exports = asyncHandler; 