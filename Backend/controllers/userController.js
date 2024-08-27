const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");


//Register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "Sample id 123",
            url: "sampleUrl"
        }
    });

    sendToken(user, 201, res);

});

// User Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select('+password'); //.select('+password') also returns password along with other fields.

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

//Logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logout Successful"
    })
});

//Forgot Password handling
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get reset token
    const resetToken = user.getResetPassToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password Reset Token is : \n\n ${resetPasswordUrl} \n`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce password recovery',
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

// Forgot Password Reset using link
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
        return next(new ErrorHandler("Reset password Token is invalid/expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password not matching", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
})

// et user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorHandler("Invalid User", 400));
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid User", 400));
    }

    const isPasswordCorrect = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordCorrect) {
        return next(new ErrorHandler("Invalid OldPassword", 401));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("New Password and Confirm password do not match", 401));
    }

    user.password = req.body.newPassword;

    await user.save()

    sendToken(user, 200, res);
})

//Update User Profile
exports.updateUserData = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        newUserData,
        {
            new: true, // return the modified document instead of original
            runValidators: true,
            useFindAndModify: false
        }
    )

    //await user.save()

    res.status(200).json({
        success: true,
        message: "Update successful"
    })
})