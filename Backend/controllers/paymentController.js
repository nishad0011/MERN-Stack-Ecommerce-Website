const crypto = require('crypto');

const catchAsyncErrors = require("../middleware/catchAsyncError");
var myModule = require('../server');

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    // console.log("req.body = ", req.body);
    // console.log("req.body.amount = ", req.body.amount);

    const amount = req.body.totalPrice
    const currency = "INR"

    const instance = myModule.instance

    myPayment = await instance.orders.create({
        "amount": amount,
        "currency": currency
    })


    res.status(200).json({ success: true, newOrder: myPayment })
});

exports.paymentVerification = catchAsyncErrors(async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;


    if (isAuthentic) {
        if (process.env.PROD === "PROD") {
            const url = `https://supercom-malz.onrender.com/process/payment/success/${razorpay_payment_id}`
            res.redirect(url);
        }
        else {
            const url = `${process.env.FRONTEND_URL}/process/payment/success/${razorpay_payment_id}`
            res.redirect(url);
        }
    }
    else {
        res.status(400).json({ success: false })
    }
});

exports.getPaymentDetails = catchAsyncErrors(async (req, res) => {


    const instance = myModule.instance
    // console.log("instance = ", instance);

    const orderId = req.params.id
    // console.log("orderId = ", orderId);

    myPayment = await instance.payments.fetch(orderId)
    // console.log("myPayment = ", myPayment);

    res.status(200).json({ success: true, myPayment: myPayment })
});