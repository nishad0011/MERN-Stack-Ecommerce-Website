const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name.'],
        maxLength: [30, 'Name cannot exceed 30 chars'],
        minLength: [4, 'Name should have atleast 4 chars']
    },
    email: {
        type: String,
        required: [true, 'Please enter email.'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please enter Password.'],
        minLength: [8, 'Password should have atleast 8 chars'],
        select: false // prevents from showing in find all query.
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Using "async function(next)" to use 'this' in function (not possible in arrow function).
userSchema.pre("save", async function (next) {
    // Prevent password encryption during Update method
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)

})

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

// Verify password function
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);

};

// Generating Password reset token
userSchema.methods.getResetPassToken = function () {
    //Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // console.log("In getResetPassToken:");
    // console.log("resetToken = ", resetToken);

    // Hashing and adding to user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // console.log("resetPasswordToken = ", resetPasswordToken);


    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000 /* 15 mins? */;

    return resetToken;
}

module.exports = mongoose.model("User", userSchema);
