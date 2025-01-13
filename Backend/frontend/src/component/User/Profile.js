import React from "react";
import Metadata from "../layout/Metadata.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Loader from "../layout/Loader/Loader.js";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.user);

  // console.log(user);


  // useEffect(() => {
  //   if (isAuthenticated === false || !user) {
  //     navigate(`/login`);
  //   }
  // }, [navigate]);

  return (
    <>
      <Metadata title={`Profile - ${user.name}`} />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                className="prof_img"
                src={user.avatar.url}
                alt="User Profile"
              />
              <Link to="/me/update">Edit 🖊</Link>
            </div>
            <div>
              <div>
                <h4>Name : </h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email : </h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Account Created on : </h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders/me">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
