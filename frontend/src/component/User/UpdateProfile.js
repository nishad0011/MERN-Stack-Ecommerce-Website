import React, { Fragment, useRef, useState, useEffect } from "react";
import "./UpdateProfile.css";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import { BiFace } from "react-icons/bi";
import { MdOutlineMail, MdLockOpen } from "react-icons/md";

import { loadUser, updateProfile, clearErrors } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Metadata from "../layout/Metadata.js";
import Loader from "../layout/Loader/Loader";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    // console.log("Signup Form Submitted");

    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name == "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        //0=initial , 1=Loading , 2=Read Complete
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error && error != "Please Login to access resource") {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/profile");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);

  return (
    <>
      <Metadata title={`Update Profile - ${user.name}`} />
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileform"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
                action=""
              >
                <div className="updateProfileName">
                  <BiFace />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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

                <div className="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update Profile"
                  className="updateProfileBtn"
                  disabled={loading ? true : false}
                />
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
