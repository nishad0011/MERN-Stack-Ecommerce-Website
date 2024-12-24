import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";

import "./OrderDetails.css";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import Metadata from "../layout/Metadata";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(params.id));
  }, [alert, dispatch, error, params]);

  if (loading) return <Loader />;

  return (
    <>
      <Metadata title={"Order Details"} />
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <div>
            <h1 component="h1">Order #{order && order._id}</h1>
            <h2 className="title">Shipping Info</h2>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name :</p>
                <span>{order.uses && order.user.name}</span>
              </div>
              <div>
                <p>Phone :</p>
                <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address :</p>
                <span>
                  {order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}-${order.shippingInfo.pincode}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
                </span>
              </div>
            </div>

            <h2 className="title">Payment Information</h2>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.paymentInfo &&
                    order.paymentInfo.status === "Successful"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.paymentInfo &&
                  order.paymentInfo.status === "Successful"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
              </div>
              <div>
                <p>Amount : </p>
                <span>{order.totalPrice && order.totalPrice}</span>
              </div>
            </div>

            <h2 className="title">Order Status</h2>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.orderStatus && order.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.orderStatus && order.orderStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="confirmCartItems">
            <h2 className="title">Order Items:</h2>
            <div className="confirmCartItemsContainer">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    {"  "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
