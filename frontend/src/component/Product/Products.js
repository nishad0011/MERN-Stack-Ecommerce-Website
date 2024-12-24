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
  "Electronics",
  "Laptop",
  "Footwear",
  "Pants",
  "Shirts",
  "Camera",
  "Phones",
];

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  const categoryHandler = (category) => {
    setCategory(category);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Metadata title="PRODUCTS" />

      <h2 className="productsHeading">PRODUCTS</h2>
      <div className="products">
        {products.length ? (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <h1 className="noProdDiv">No Products Found</h1>
        )}
      </div>

      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChangeCommitted={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
          aria-label="Default"
          step={50}
        />

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

        <fieldset>
          <Typography>Ratings Above</Typography>
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
