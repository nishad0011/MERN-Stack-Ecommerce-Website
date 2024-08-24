// Express
const express = require("express");
const app = express();

app.use(express.json());

//Routes
const products = require("./routes/productRoute");
app.use("/api/v1", products);

// Middleware for error
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

module.exports = app