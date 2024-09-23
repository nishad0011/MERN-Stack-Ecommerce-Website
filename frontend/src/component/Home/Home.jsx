import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";

import Product from "./ProductCard.js";
import Metadata from "../layout/Metadata.js";

import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useAlert } from "react-alert";

import Loader from "../layout/Loader/Loader";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Metadata title="SUPERCOM" />

      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find Products Below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeheading">Featured Products</h2>

      <div className="container" id="container">
        {products && products.map((product) => <Product product={product} />)}
      </div>
    </Fragment>
  );
};

export default Home;
