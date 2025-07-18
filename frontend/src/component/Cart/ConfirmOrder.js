import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Metadata from "../layout/Metadata";
import CheckoutSteps from "./CheckoutSteps.js";
import { Typography } from "@material-ui/core";
import "./confirmOrder.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);


  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharges + tax;


  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
      tax,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    localStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  const fullAddress = `${shippingInfo.address}, ${shippingInfo.city} - ${shippingInfo.pincode}, ${shippingInfo.state}, ${shippingInfo.country}`;

  return (
    <>
      <Metadata title={"Confirm Order"} />
      <CheckoutSteps activeSteps={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name :</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone : </p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address : </p>
                <span>{fullAddress}</span>
              </div>
            </div>
          </div>

          <div className="confirmCartItems">
            <Typography>Cart items</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
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

        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST :</p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total : </b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
