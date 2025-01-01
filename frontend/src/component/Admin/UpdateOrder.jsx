import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { GrDeliver } from "react-icons/gr";

import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import "./updateOrder.css";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstants";
import { getOrderDetails, updateOrder } from "../../actions/orderAction";
import { clearErrors } from "../../actions/orderAction";

const UpdateOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const { error, order, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [state, setState] = useState("");
  const [stateShow, setStateShow] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const form = JSON.stringify({
      status: state,
    });
    dispatch(updateOrder(params.id, form));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (order.length == 0) {
      dispatch(getOrderDetails(params.id));
    }
  }, [params.id, dispatch, alert, error]);

  useEffect(() => {
    if (updateError) {
      console.log(updateError);
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDERS_RESET });
      dispatch(getOrderDetails(params.id));
    }
  }, [updateError, isUpdated]);

  return (
    <>
      <Metadata title={"Order Details"} />
      <div className="confirmOrderPage">
        <Sidebar />
        {loading ? null : (
          <>
            <div>
              <div className="confirmShippingArea">
                <h2 className="title">Shipping info</h2>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name :</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone :</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address :</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}-${order.shippingInfo.pincode}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
              </div>
              <h2 className="title">Payment info</h2>
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
                      {order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>

              <div className="confirmCartItems">
                <h2 className="title">Cart items</h2>
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

            <div>
              <div
                className="orderSummary"
                style={{
                  display: order?.orderStatus == "Delivered" ? "none" : "block",
                }}
              >
                <Typography>Process Order</Typography>
                <div className="updateOrderFormContainer">
                  <form
                    className="newProductForm"
                    encType="multipart/form-data"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <div>
                      <GrDeliver />
                      <select onChange={(e) => setState(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" ? (
                          <option value="Shipping">Shipping</option>
                        ) : null}
                        {order.orderStatus === "Shipping" ? (
                          <>
                            <option value="Processing">Processing</option>
                            <option value="Delivered">Delivered</option>
                          </>
                        ) : null}
                      </select>
                    </div>

                    <div>
                      <button
                        id="createProdBtn"
                        type="submit"
                        disabled={
                          loading ? true : false || state === "" ? true : false
                        }
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UpdateOrder;
