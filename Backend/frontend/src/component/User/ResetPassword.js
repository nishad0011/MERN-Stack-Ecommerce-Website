import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";

import { FaCheck } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import "./ResetPassword.css";
import { clearErrors } from "../../actions/userAction";
import Metadata from "../layout/Metadata.js";
import Loader from "../layout/Loader/Loader";
import { resetPassword } from "../../actions/userAction";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();

    const { error, loading, success } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        console.log(params.token);

        dispatch(resetPassword(params.token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");
            navigate("/login");

        }
    }, [dispatch, error, alert, navigate, success]);


    return (<>
        <Metadata title={`Update Password`} />
        <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
                {loading ? (
                    <Loader />
                ) :
                    (<>
                        <h2 className="updatePasswordHeading">Reset Password</h2>
                        <form
                            className="updatePasswordform"
                            onSubmit={resetPasswordSubmit}
                            action=""
                        >
                            <div className="loginPass">
                                <FaLock />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

export default ResetPassword;