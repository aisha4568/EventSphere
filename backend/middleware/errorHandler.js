const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Server Error';

  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }
  if (err.code === 11000) {
    status = 400;
    message = `Duplicate value for: ${Object.keys(err.keyValue)}`;
  }

  res.status(status).json({
    success: false,
    message,
    details: err.details || [],
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
module.exports = errorHandler;