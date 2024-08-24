const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncError")

//Create products ADMIN ONLY
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

//Update products ADMIN ONLY
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    //No match
    if (!product) {
        //500 - Internal server error
        return res.status(500).json({
            success: false,
            message: "Product not found with given ID."
        })
    }

    product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    res.status(200).json({
        success: true,
        message: "Updated Product Successfully",
        product
    })
});

//Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    });

});

//Get single product Details
exports.getSingleProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        //500 - Internal server error
        return next(new ErrorHandler("No Product found for given ID", 404));
    }

    else {
        return res.status(200).json({
            status: true,
            product
        })
    }

});

//Delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "No product Found."
        })
    }

    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product deleted Successfully."
    })
});