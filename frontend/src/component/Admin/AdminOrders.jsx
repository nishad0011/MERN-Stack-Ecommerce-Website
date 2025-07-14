import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { MdEdit } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { DataGrid } from "@material-ui/data-grid";

import "./AdminDashboard.css";
import "./AdminProductsList.css";
import Sidebar from "./Sidebar";

import {
  clearErrors,
  getProductsAdmin,
  deleteProduct,
} from "../../actions/productAction";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { deleteOrder, getAllOrders } from "../../actions/orderAction";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, orders, loading } = useSelector((state) => state.allOrders);

  const {
    error: deleteError,
    isDeleted,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.order);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.1,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Unique Items",
      type: "number",
      minWidth: 200,
      flex: 0.1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.1,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 150,
      flex: 0.1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              className="LinkBtn"
              to={`${
                window.location.origin
              }/admin/order/update/${params.getValue(params.id, "id")}`}
            >
              <MdEdit />
            </Link>
            <Button
              className="LinkBtn"
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
              disabled={deleteLoading}
            >
              <MdDeleteSweep />
            </Button>
          </>
        );
      },
    },
    {
      field: "date",
      headerName: "Order Date",
      type: "date",
      flex: 0.5,
      sortable: true,
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        date: new Date(item.createdAt).toLocaleString(),
      });
    });

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error]);

  useEffect(() => {
    if (deleteError) {
      alert.error(message);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch(getAllOrders());
    }
  }, [dispatch, alert, deleteError, isDeleted, message]);

  return (
    <>
      <Metadata title={"All Products - (Admin)"} />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <h1 className="productsListHeading">All Orders</h1>
          {loading ? (
            <Loader />
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
