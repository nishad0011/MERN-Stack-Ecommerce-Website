import React from "react";

import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  function buttonHandler() {
    navigate("/");
  }
  return (
    <>
      <h1 className="notFoundHeader">404</h1>
      <h1 className="notFoundText">Page Not Found</h1>
      <button className="notFoundHomeBtn" onClick={buttonHandler}>
        Home
      </button>
    </>
  );
};

export default NotFoundPage;
