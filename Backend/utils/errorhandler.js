/* 
    interface Error {
        name: string;
        message: string;
        stack?: string;
    }
 */
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        //super refers to parent class (Here it is "Error" class)
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler