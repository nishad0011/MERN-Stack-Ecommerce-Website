const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {

    const { shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    });
});

// Get single order details
exports.getOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email"); //populates name and mail using user id

    if (!order) {
        return next(new ErrorHandler("No Order found for given ID", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Get all orders of user
exports.getUserOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
        return next(new ErrorHandler("No Orders found for given User", 404));
    }

    res.status(200).json({
        success: true,
        orders
    });
});

// Get all orders (ADMIN)
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    if (!orders) {
        return next(new ErrorHandler("No Orders found for given User", 404));
    }

    // Calculate sum of all order amounts.
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// Update order status (ADMIN)
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("No Order found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Product already delivered", 400));
    }



    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.orderItems.forEach(async (item) => {
            await updateStock(item.product, item.quantity);
        });
    }

    await order.save({ validateBeforeSvae: false });
    res.status(200).json({
        success: true,
        order
    });
});

// Delete order (ADMIN)
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("No Orders found", 404));
    }


    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSvae: false });

}