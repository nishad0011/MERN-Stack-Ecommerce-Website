import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";

import { getAllOrders, clearErrors as clearOrderErrors } from "../../actions/orderAction.js";
import { getProductsAdmin, clearErrors as clearProductErrors } from "../../actions/productAction.js";
import { clearErrors, getAllUsers } from "../../actions/userAction.js";

import Sidebar from "./Sidebar.js";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { products, error: productsError } = useSelector(state => state.products)
  const { orders, error: ordersError } = useSelector(state => state.allOrders)
  const { error: allUserErrors, users } = useSelector((state) => state.allUsers);


  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    dispatch(getProductsAdmin())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  }, [dispatch]);

  // Calculate amount
  useEffect(() => {
    if (orders) {
      let tempTotal = 0
      orders.forEach(order => {
        tempTotal += order.totalPrice
      });
      setTotalAmount(tempTotal)
    }
  }, [orders]);

  useEffect(() => {
    if (ordersError) {
      alert.error(ordersError);
      dispatch(clearOrderErrors());
    }
    if (allUserErrors) {
      alert.error(allUserErrors);
      dispatch(clearErrors());
    }
    if (productsError) {
      alert.error(productsError);
      dispatch(clearProductErrors());
    }

  }, [dispatch, alert, ordersError, productsError, allUserErrors]);

  return (
    <>
      <div className="dashboard">
        <Sidebar />

        <div className="dashboardContainer">
          <h1>Dashboard</h1>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Orders <br /> {totalAmount}
              </p>
            </div>
          </div>

          <div className="dashboardSummary2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
          <div className="charts"></div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
