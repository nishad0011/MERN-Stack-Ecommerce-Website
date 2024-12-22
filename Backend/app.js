// Express
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//Routes
const products = require("./routes/productRoute");
app.use("/api/v1", products);

const user = require("./routes/userRoute")
app.use("/api/v1", user);

const order = require("./routes/orderRoute")
app.use("/api/v1", order);

const payment = require("./routes/paymentRoute")
app.use("/api/v1", payment);

app.get("/api/razorkey", (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})

// Middleware for error
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

module.exports = app