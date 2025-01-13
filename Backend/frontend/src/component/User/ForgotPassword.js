import React, { Fragment, useRef, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import { BiFace } from "react-icons/bi";
import { MdOutlineMail, MdLockOpen } from "react-icons/md";

import "./ForgotPassword.css";
import { loadUser, updateProfile, clearErrors } from "../../actions/userAction";
import { forgotPassword } from "../../actions/userAction";
import Metadata from "../layout/Metadata.js";
import Loader from "../layout/Loader/Loader";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, loading, message } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);

        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (message) {
            alert.success(message);

            //navigate("/profile");
        }
    }, [dispatch, error, alert, navigate, message]);

    return (
        <>
            <Metadata title={`Forgot Password`} />
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            <h2 className="updateProfileHeading">Forgot Password</h2>
                            <form
                                className="updateProfileform"
                                encType="multipart/form-data"
                                onSubmit={forgotPasswordSubmit}
                                action=""
                            >
                                <div className="updateProfileEmail">
                                    <MdOutlineMail />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Send Recovery Mail"
                                    className="updateProfileBtn"
                                    disabled={loading ? true : false}
                                />
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ForgotPassword