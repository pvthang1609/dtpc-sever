class Response {
  constructor(success, data, message, status) {
    this.success = success || false;
    this.data = data || null;
    this.message = message || null;
    this.status = status;
  }
}

module.exports = Response;
