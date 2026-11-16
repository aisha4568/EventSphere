class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

// ✅ Yahan 'module.exports = ApiResponse' hona chahiye (curly braces ke baghair)
module.exports = ApiResponse;