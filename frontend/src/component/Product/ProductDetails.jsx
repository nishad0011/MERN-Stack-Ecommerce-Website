import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Carousel from "react-material-ui-carousel";
import { useAlert } from "react-alert";

import "./ProductDetails.css";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { addItemsToCart } from "../../actions/cartAction.js";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  // Getting data from Store
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [quantity, setQuantity] = useState(1);

  // Product Quantity Counter
  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  // Add to cart logic
  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id, quantity));
    alert.success("Item added to Cart");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // Storing data in redux store
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activecolor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <div className="ParentDiv">
        <div className="ProductDetails">
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
        <div className="detailsBlock">
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product #{product._id}</p>
          </div>

          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span>{product.numOfReviews} Reviews</span>
          </div>

          <div className="detailsBlock-3">
            <h1>₹ {product.price}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly value={quantity} type="number" />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button onClick={addToCartHandler}>Add to Cart</button>
            </div>
            <p>
              Status:{"  "}
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1
                  ? "OutOfStock"
                  : `InStock (${product.stock})`}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description: <p>{product.description}</p>
          </div>
          <button className="submitReview">Submit Review</button>
        </div>
      </div>
      <div>
        <h3 className="revHeadings">REVIEWS</h3>

        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => <ReviewCard review={review} />)}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </div>
    </Fragment>
  );
};

export default ProductDetails;
