const express = require('express');
const { isAuthenticatedUser } = require('../middleware/authentication');
const { processPayment, paymentVerification, getPaymentDetails } = require('../controllers/paymentController');

const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/payment/verify").post(paymentVerification);
router.route("/payment/getPaymentById/:id").get(getPaymentDetails);

module.exports = router;