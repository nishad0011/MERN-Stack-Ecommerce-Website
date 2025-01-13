// Express
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require("path")

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//Config file
if (process.env.PROD !== "PROD") {
    require('dotenv').config({ path: "Backend/config/config.env" });
}

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


// app.use(express.static(path.join(__dirname, "frontend","build")))
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
// })

app.use(express.static(path.join(__dirname, "../frontend", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
})

// app.get("/", (req, res) => {
//     app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });



// Middleware for error
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

module.exports = app