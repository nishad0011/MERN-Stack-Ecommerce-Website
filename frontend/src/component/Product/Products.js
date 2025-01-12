import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import "./Products.css";
import Metadata from "../layout/Metadata.js";
import {
  clearErrors,
  getProduct,
  getProductDetails,
} from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/ProductCard.js";

const categories = [
  "All",
  "Electronics",
  "Laptop",
  "Footwear",
  "Pants",
  "Shirts",
  "Cameras",
  "Phones",
];

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [price, setPrice] = useState([0, maxPrice]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  const categoryHandler = (category) => {
    if (category == "All") {
      setCategory("");
    } else setCategory(category);
    setCurrentPage(0);
  };

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProdCount,
  } = useSelector((state) => state.products);
  const keyword = params.keyword;

  // const resultPerPage = 12;

  useEffect(() => {
    // Error Handling
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));

  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  useEffect(() => {
    //Set max price in price range
    if (products.length > 0) {
      let tempMaxPrice = 0;
      products?.forEach((product) => {
        if (product.price > tempMaxPrice) tempMaxPrice = product.price
      })
      setMaxPrice(tempMaxPrice)
    }
  }, [products])

  return (
    <Fragment>
      <Metadata title="PRODUCTS" />

      <h2 className="productsHeading">PRODUCTS</h2>
      <div className="sidebarProductsContainer">
        <div className="filterBox">
          <Typography>Price</Typography>
          <div className="sliderDiv">
            <Slider
              value={price}
              size="large"
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={maxPrice}
              aria-label="Default"
              step={50}
            />
          </div>

          <Typography>Categories</Typography>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                keys={category}
                onClick={() => categoryHandler(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          <Typography>Ratings Above</Typography>
          <div className="sliderDiv">
            <fieldset>
              <Slider
                value={ratings}
                onChange={(e, newRatings) => {
                  setRatings(newRatings);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
        </div>

        <div className="products">
          {loading ? (
            <Loader />
          ) : products.length ? (
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <h1 className="noProdDiv">No Products Found</h1>
          )}
        </div>
      </div>

      {resultPerPage < filteredProdCount && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Products;
