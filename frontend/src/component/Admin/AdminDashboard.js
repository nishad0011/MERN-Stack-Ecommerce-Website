import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Doughnut, Line } from "react-chartjs-2";
import { useAlert } from "react-alert";

import { getAllOrders, clearErrors as clearOrderErrors } from "../../actions/orderAction.js";
import { getProductsAdmin, clearErrors as clearProductErrors } from "../../actions/productAction.js";

import Sidebar from "./Sidebar.js";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { products, error: productsError } = useSelector(state => state.products)
  const { orders, error: ordersError } = useSelector(state => state.allOrders)
  const { user } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getProductsAdmin())
    dispatch(getAllOrders())
  }, []);

  useEffect(() => {
    if (ordersError) {
      alert.error(ordersError);
      dispatch(clearOrderErrors());
    }
    if (productsError) {
      alert.error(productsError);
      dispatch(clearProductErrors());
    }

  }, [dispatch, alert, ordersError, productsError]);

  return (
    <>
      <div className="dashboard">
        <Sidebar />

        <div className="dashboardContainer">
          <h1>Dashboard</h1>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> 2000
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
              <p>2</p>
            </Link>
          </div>
          <div className="charts"></div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
