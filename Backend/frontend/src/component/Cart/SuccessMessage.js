import React from "react";
import { Link, useLocation } from "react-router-dom";

import { FaCheckCircle } from "react-icons/fa";

import "./SuccessMessage.css";

const SuccessMessage = () => {
  const location = useLocation();
  // console.log("location = ", location);

  return (
    <>
      <div className="orderSuccess">
        <FaCheckCircle />
        <div>Your Order has been placed Successfully</div>
        <Link to="/orders/me">View All Orders</Link>
      </div>
    </>
  );
};

export default SuccessMessage;
