class HttpError extends Error {
    constructor(message, status) {
        super(message);
        status = this.status ? this.status : 400;
    }
}

class NotFound extends HttpError {
    status = 404;
    constructor(message = 'Not Found') {
        super(message);
    }
}

class BadRequest extends HttpError {
    status = 400;
    constructor(message = 'Bad Request') {
        super(message);
    }
}

module.exports = {
    NotFound: NotFound,
    BadRequest,
}