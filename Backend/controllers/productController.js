const Product = require("../models/productModel");

//Ceate products ADMIN ONLY
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

//Update products ADMIN ONLY
exports.updateProduct = async (req, res, next) => {
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
}

//Get all products
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    });

}

//Delete product
exports.deleteProduct = async (req, res, next) => {
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
}