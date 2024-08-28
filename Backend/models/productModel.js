const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name.'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter product description.']
    },
    price: {
        type: Number,
        required: [true, 'Please enter price.'],
        maxLength: [8, "Price cannot exceed 8 characters."]
    },
    ratings: {
        type: Number,
        default: 0
    },
    //using [] as images is array of objects.
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    }],
    category: {
        type: String,
        required: [true, 'Please Enter Product'],
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter stock'],
        maxLength: [4, "Stock cannot exceed 4 charcaters."],
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        name: {
            type: String,
            required: true
        },
        rating: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            req: true
        },
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        req: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("Product", productSchema);