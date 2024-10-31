const app = require("./app");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to Uncaught Exception");
    process.exit(1);
})

//Config file
const dotenv = require('dotenv');
dotenv.config({ path: "backend/config/config.env" });

//Database connection
const connectDatabase = require('./config/databaseConnect');
connectDatabase();

//Cloudinary for uploading images
const cloudinary = require("cloudinary")
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(
    process.env.PORT,
    () => { console.log(`Server running on port http://localhost:${process.env.PORT}`) }
);

//DB connection error handle
process.on('unhandledRejection', err => {
    console.log(`Error:${err.message}`);
    console.log("Shutting down server due to unhandled promise Rejection");
    server.close(() => {
        process.exit(1);
    })
})