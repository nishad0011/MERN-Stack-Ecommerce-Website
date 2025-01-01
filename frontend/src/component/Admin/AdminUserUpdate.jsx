import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAlert } from "react-alert";

import { MdOutlineAccountCircle, MdOutlineMailOutline } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import "./AdminDashboard.css";
import "./NewProduct.css";
import Sidebar from "./Sidebar";

import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { clearErrors, getUserDetails } from "../../actions/userAction";
import { updateUser } from "../../actions/userAction";

const AdminUserUpdate = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const {
    error: updateError,
    loading: updateLoading,
    isUpdated,
  } = useSelector((state) => state.profile);
  const { error, loading, user } = useSelector((state) => state.userDetails);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const userId = params.id;

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  }, [user]);

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, []);

  useEffect(() => {
    // if (userId != user._id || user.length == 0) {
    //   dispatch(getUserDetails(userId));
    // } else {
    //   setName(user.name);
    //   setEmail(user.email);
    //   setRole(user.role);
    // }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User Updated Successfully");
      dispatch({ type: UPDATE_USER_RESET });
      // dispatch(getUserDetails());
      navigate("/admin/users");
    }
  }, [dispatch, alert, error, navigate, isUpdated]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const form = JSON.stringify({
      name: name,
      role: role,
      email: email,
    });
    dispatch(updateUser(userId, form));
  };

  return (
    <>
      <Metadata title={"Update User Details"} />
      <div className="dashboard">
        <Sidebar />
        {updateLoading ? (
          <Loader />
        ) : (
          <div className="newProductContainer">
            <h1 className="productsListHeading">Update User</h1>
            <div className="formContainer">
              <form
                className="newProductForm"
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
              >
                <div>
                  <MdOutlineAccountCircle />
                  <input
                    type="text"
                    placeholder="User Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MdOutlineMailOutline />
                  <input
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <IoShieldCheckmarkOutline />
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                  >
                    <option value="">Choose Role</option>
                    <option value={"admin"}>admin</option>
                    <option value={"user"}>user</option>
                  </select>
                </div>

                <div>
                  <button
                    id="createProdBtn"
                    type="submit"
                    disabled={
                      (loading || updateLoading ? true : false) ||
                      (role == "" ? true : false)
                    }
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminUserUpdate;
