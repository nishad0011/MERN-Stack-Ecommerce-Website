import React from "react";
import { Link } from "react-router-dom";

import { Doughnut, Line } from "react-chartjs-2";

import Sidebar from "./Sidebar.js";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  console.log("window.location.origin = ", window.location.origin);

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
              <p>50</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>4</p>
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
