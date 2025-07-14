import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useAlert } from "react-alert";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import "./ProductDetails.css";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import {
  NEW_REVIEW_RESET,
  PRODUCT_DETAILS_RESET,
} from "../../constants/productConstants.js";
import { addItemsToCart } from "../../actions/cartAction.js";
import ReviewCard from "./ReviewCard.js";
import CustomCarousel from "./CustomCarousel.js";
import Loader from "../layout/Loader/Loader";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  // Getting data from Store
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { user } = useSelector((state) => state.user);

  if (product) {
    if (product._id !== params.id) {
      console.log("reset proddetails ");
      dispatch({ type: PRODUCT_DETAILS_RESET });
      dispatch(getProductDetails(params.id));
    }
  }

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState("");

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

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    // Storing data in redux store
  }, [dispatch, params.id, error, alert, reviewError, success]);

  useEffect(() => {
    if (product) {
      if (product.ratings != undefined) {
        let obj = {
          value: product.ratings,
          readOnly: true,
          precision: 0.5,
          size: "large",
        };
        setOptions(obj);
      }
      if (product.images != undefined) {
        setImages(product.images);
      }
    }
  }, [product]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <div className="ParentDiv">
        <div className="imageBox">
          {product?._id == params.id &&
            (images.length == 0 ? null : <CustomCarousel images={images} />)}
        </div>
        <div className="detailsBlock">
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product #{product._id}</p>
          </div>

          <div className="detailsBlock-2">
            {Object.keys(options).length == 0 ? null : (
              <>
                <Rating {...options} />
                <span>{product.numOfReviews} Reviews</span>
              </>
            )}
          </div>

          <div className="detailsBlock-3">
            <h1>₹ {product.price}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly value={quantity} type="number" />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button
                disabled={product.stock < 1 ? true : false}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
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
          {user ? (
            <button onClick={submitReviewToggle} className="submitReview">
              Submit Review
            </button>
          ) : null}
        </div>
      </div>
      <div>
        <h3 className="revHeadings">REVIEWS</h3>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
            />
            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
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
