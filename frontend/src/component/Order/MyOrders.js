import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import { MdLaunch } from "react-icons/md";

import "./MyOrders.css";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";
import { clearErrors, getMyOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <MdLaunch />
          </Link>
        );
      },
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
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMyOrders());
  }, [alert, dispatch, error]);

  return (
    <>
      <Metadata title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <h2 id="myOrdersHeading">{user.name}'s Orders</h2>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default MyOrders;
