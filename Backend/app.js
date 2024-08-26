// Express
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());

//Routes
const products = require("./routes/productRoute");
app.use("/api/v1", products);

const user = require("./routes/userRoute")
app.use("/api/v1", user);

// Middleware for error
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

module.exports = app