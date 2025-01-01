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

import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";

const AdminUsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, users, loading } = useSelector((state) => state.allUsers);

  const { loading: currentUserLoading, user } = useSelector(
    (state) => state.user
  );

  const {
    error: deleteError,
    isDeleted,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.profile);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 300, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 100,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "";
      },
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
              to={`${window.location.origin}/admin/user/${params.getValue(
                params.id,
                "id"
              )}`}
            >
              <MdEdit />
            </Link>
            <Button
              className="LinkBtn"
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
              disabled={
                deleteLoading || params.getValue(params.id, "id") == user._id
              }
            >
              <MdDeleteSweep />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((user, index) => {
      rows.push({
        name: user.name,
        id: user._id,
        email: user.email,
        role: user.role,
      });
    });

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error]);

  useEffect(() => {
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      dispatch({ type: DELETE_USER_RESET });
      dispatch(getAllUsers());
    }
  }, [dispatch, alert, deleteError, isDeleted, message]);

  return (
    <>
      <Metadata title={"All Products - (Admin)"} />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <h1 className="productsListHeading">All Users</h1>
          {loading || currentUserLoading || deleteLoading ? (
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

export default AdminUsersList;
