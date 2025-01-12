import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { MdDeleteSweep } from "react-icons/md";
import { DataGrid } from "@material-ui/data-grid";

import "./AdminDashboard.css";
import "./AdminReviews.css";
import Sidebar from "./Sidebar";

import {
  DELETE_PRODUCT_RESET,
  DELETE_REVIEW_RESET,
} from "../../constants/productConstants";
import {
  clearErrors,
  getAllReviews,
  deleteReview,
  getProductsAdmin,
} from "../../actions/productAction";

import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";

const AdminReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const {
    loading: allProductsLoading,
    products,
    error: allProductsError,
  } = useSelector((state) => state.products);
  const {
    error: deleteError,
    isDeleted,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.deleteReview);

  const columns = [
    {
      field: "productIndex",
      headerName: "Product Index",
      minWidth: 50,
      flex: 0.2,
    },
    { field: "productId", headerName: "Product ID", minWidth: 150, flex: 0.4 },
    {
      field: "productName",
      headerName: "Product Name",
      minWidth: 150,
      flex: 0.4,
    },
    { field: "id", headerName: "Review ID", minWidth: 150, flex: 0.4 },
    {
      field: "reviewName",
      headerName: "User Name",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "reviewRating",
      headerName: "Rating",
      type: "number",
      minWidth: 30,
      flex: 0.3,
    },
    {
      field: "reviewComment",
      headerName: "Comment",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 150,
      flex: 0.2,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              className="LinkBtn"
              onClick={() =>
                deleteReviewHandler(
                  params.getValue(params.id, "id"),
                  params.getValue(params.id, "productId")
                )
              }
              disabled={deleteLoading}
            >
              <MdDeleteSweep />
            </Button>
          </>
        );
      },
    },
  ];
  const [rows, setRows] = useState([]);

  const deleteReviewHandler = (id, productId) => {
    // console.log("delete ", id, " ", productId);
    dispatch(deleteReview(id, productId));
    dispatch(getProductsAdmin());
  };

  useEffect(() => {
    console.log("products.length = ", products.length);
    var tempRows = [];
    let i = 0;
    products &&
      products.forEach((product, index) => {
        if (product.reviews.length >= 1) {
          i++;
          product.reviews.forEach((review) => {
            tempRows.push({
              productIndex: i,
              productId: product._id,
              productName: product.name,
              reviewName: review.name,
              id: review._id,
              reviewRating: review.rating,
              reviewComment: review.comment,
              reviewUser: review.user,
            });
          });
        }
      });
    setRows(tempRows);
  }, [products, isDeleted]);

  //Initial product load
  useEffect(() => {
    if (allProductsError) {
      alert.error(allProductsError);
      dispatch(clearErrors());
    }
    if (products.length == 0) {
      dispatch(getProductsAdmin());
    }
  }, [dispatch, alert, error]);

  useEffect(() => {
    if (deleteError) {
      alert.error(message);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      dispatch({ type: DELETE_REVIEW_RESET });
      dispatch(getProductsAdmin());
    }
  }, [dispatch, alert, deleteError, isDeleted, message]);

  return (
    <>
      <Metadata title={"All Reviews - (Admin)"} />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <h1 className="productsListHeading">All Reviews</h1>
          {loading || allProductsLoading ? (
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

export default AdminReviews;
