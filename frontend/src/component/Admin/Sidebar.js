import React from "react";
import { Link } from "react-router-dom";

import { TreeItem, TreeView } from "@material-ui/lab";
import { MdDashboard } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";

import logo from "../../ecom_logo.png";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Link to={"/"}>
          <img src={logo} width={150} alt="logo" />
        </Link>
        <Link to={"/admin/dashboard"}>
          <p>
            <MdDashboard /> Dashboard
          </p>
        </Link>

        <Link>
          <TreeView
            defaultCollapseIcon={<MdExpandLess />}
            defaultExpandIcon={<MdExpandMore />}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<IoMdAdd />} />
              </Link>
              <Link to="/admin/product/new">
                <TreeItem nodeId="3" label="Create" icon={<IoMdAdd />} />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>

        <Link to={"/admin/orders"}>
          <p>
            <FaBox /> Orders
          </p>
        </Link>

        <Link to={"/admin/users"}>
          <p>
            <FaRegUser /> Users
          </p>
        </Link>

        <Link to={"/admin/review"}>
          <p>
            <MdOutlineRateReview /> Review
          </p>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
