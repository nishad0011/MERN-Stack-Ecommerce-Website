import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";


import { MdOutlineVpnKey } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


import "./UpdatePassword.css";
import { loadUser, updatePassword, clearErrors } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import Metadata from "../layout/Metadata.js";
import Loader from "../layout/Loader/Loader";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    const { error, loading, isUpdated } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error && error != "Please Login to access resource") {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password Updated Successfully");

            navigate("/profile");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, alert, navigate, user, isUpdated]);


    return (<>
        <Metadata title={`Update Password - ${user.name}`} />
        <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
                {loading ? (
                    <Loader />
                ) :
                    (<>
                        <h2 className="updatePasswordHeading">Update {user.name}'s Password</h2>
                        <form
                            className="updatePasswordform"
                            onSubmit={updatePasswordSubmit}
                            action=""
                        >
                            <div className="loginPass">
                                <MdOutlineVpnKey />
                                <input
                                    name="oldpassword"
                                    type="password"
                                    placeholder="Current Password"
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className="loginPass">
                                <FaLock />
                                <input
                                    name="newPassword"
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="loginPass">
                                <FaCheck />
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm New Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Update Password"
                                className="updatePasswordBtn"
                                disabled={loading ? true : false}
                            />
                        </form>
                    </>)}
            </div>
        </div>
    </>)
}

export default UpdatePassword