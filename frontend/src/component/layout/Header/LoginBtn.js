import React from "react";
import { useNavigate } from "react-router-dom";

import "./LoginBtn.css";

const LoginBtn = () => {
  const navigate = useNavigate();

  const buttonClickHandler = () => {
    navigate("/login");
  };

  return (
    <div className="btnContainer">
      <button className="homeloginBtn" onClick={buttonClickHandler}>
        Login
      </button>
    </div>
  );
};

export default LoginBtn;
