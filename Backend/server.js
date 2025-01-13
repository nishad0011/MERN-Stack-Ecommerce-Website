const app = require("./app");


// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to Uncaught Exception");
    process.exit(1);
})

// const WebFont = require("webfontloader")
// WebFont.load({
//     google: {
//         families: ["Roboto", "Droid Sans", "Chilanka", "Open Sans"]
//     }
// })

//Config file
if (process.env.NODE_ENV !== "PRODUCTION") {
    const dotenv = require('dotenv');
    dotenv.config({ path: "backend/config/config.env" });
}

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

// Razorpay
const Razorpay = require('razorpay');
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});
exports.instance = instance

const server = app.listen(
    process.env.PORT,
    () => { console.log(`Server running on port http://localhost:${process.env.PORT}`) }
);

// // fonts
// var WebFont = require('webfontloader');
// WebFont.load({
//     google: {
//         families: ["Roboto", "Droid Sans", "Chilanka", "Open Sans"]
//     }
// });

//DB connection error handle
process.on('unhandledRejection', err => {
    console.log(`Error:${err.message}`);
    console.log("Shutting down server due to unhandled promise Rejection");
    server.close(() => {
        process.exit(1);
    })
})