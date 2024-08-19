const express = require('express');
const { getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { createProduct } = require('../controllers/productController');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);

//Update and Delete method on same route.
router.route('/product/:id').put(updateProduct).delete(deleteProduct)

module.exports = router