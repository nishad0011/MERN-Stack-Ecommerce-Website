const express = require('express');
const {
    getAllProducts,
    updateProduct,
    deleteProduct,
    getSingleProductDetails,
    createReview,
    getProductReviews,
    deleteReviews } = require('../controllers/productController');
const { createProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authentication');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);

//Update, Delete and Get method on same route.
router.route('/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/product/:id').get(getSingleProductDetails)

// Reviews
router.route('/review').put(isAuthenticatedUser, createReview)
router.route('/review')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReviews)

module.exports = router