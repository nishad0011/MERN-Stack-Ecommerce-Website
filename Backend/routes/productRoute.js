const express = require('express');
const {
    getAllProducts,
    updateProduct,
    deleteProduct,
    getSingleProductDetails } = require('../controllers/productController');
const { createProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authentication');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);

//Update, Delete and Get method on same route.
router.route('/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)
    .get(getSingleProductDetails)

module.exports = router