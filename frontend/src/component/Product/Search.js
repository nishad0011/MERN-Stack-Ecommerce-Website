import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Search.css";
import Metadata from "../layout/Metadata.js";


const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (

    <>
      <Metadata title="SEARCH" />
      <form onSubmit={searchSubmitHandler} className="searchBox">
        <input
          type="text"
          placeholder="Search a Product"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </>
  );
};

export default Search;
