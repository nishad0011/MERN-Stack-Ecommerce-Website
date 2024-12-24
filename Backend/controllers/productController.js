const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//Create products ADMIN ONLY
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

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
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    //return next(new ErrorHandler("this is test error", 501));

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures
        (Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeature.query.clone();
    let filteredProdCount = products.length;
    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProdCount
    });

});

//Get single product Details
exports.getSingleProductDetails = catchAsyncErrors(async (req, res, next) => {
    // console.log("IN getSingleProductDetails");

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

// Create review or Update existing
exports.createReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    // Find user object if review by user already exists.
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        });
    } else {
        product.reviews.push(review)
    }
    product.numOfReviews = product.reviews.length;

    let total = Number(0);
    product.reviews.forEach(rev => {
        total += Number(rev.rating);
    })
    product.ratings = total / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: "Product review added Successfully."
    })
})

// Get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("No Product found for given ID", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Review
exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("No Product found for given ID", 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

    let total = Number(0);
    reviews.forEach(rev => {
        total += Number(rev.rating);

    })

    // Update avg rating and no of reviews
    const ratings = total / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Review deleted Successfully",
        reviews
    })
})
