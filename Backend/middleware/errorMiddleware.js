const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;/*int. server error*/
    err.message = err.message || "Internal server Error"

    // Handling wrong ID error TYPE: castError
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Mogoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }
    // Wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        const message = `Invalid JWT Token`;
        err = new ErrorHandler(message, 400);
    }
    // JWT Expire Error
    if (err.name === "TokenExpiredError") {
        const message = `JWT Token Expired`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // error: err // or use "error: err.stack"
    })
}