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

import { clearErrors, getProductsAdmin, deleteProduct } from "../../actions/productAction";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const AdminProductsList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, products, loading } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted, message, loading: deleteLoading } = useSelector(state => state.deleteProduct)

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.4 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 120,
      flex: 0.2,
    },
    {
      field: "price",
      headerName: "Price",
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
            <Link
              className="LinkBtn"
              to={`admin/product/${params.getValue(params.id, "id")}`}
            >
              <MdEdit />
            </Link>
            <Button
              className="LinkBtn"
              onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}
              disabled={deleteLoading}
            >
              <MdDeleteSweep />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];
  products &&
    products.forEach((item, index) => {
      rows.push({
        stock: item.stock,
        name: item.name,
        id: item._id,
        status: item.orderStatus,
        price: item.price,
      });
    });

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductsAdmin())

  }, [dispatch, alert, error]);

  useEffect(() => {

    if (deleteError) {
      console.log("delete error = ", deleteError)
      alert.error(message);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message)
      dispatch({ type: DELETE_PRODUCT_RESET })
      dispatch(getProductsAdmin())
    }

  }, [dispatch, alert, deleteError, isDeleted, message]);

  return (
    <>
      <Metadata title={"All Products - (Admin)"} />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <h1 className="productsListHeading">All Products</h1>
          {loading ? <Loader /> :
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />}
        </div>
      </div>
    </>
  );
};

export default AdminProductsList;
