import React from "react";

import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

import "./Header.css";

const Header = () => {
  return (
    <>
      <input type="checkbox" name="" id="cd_input" />
      <label className="open_button" for="cd_input">
        <IoMenu />
      </label>
      <div className="nav_div">
        <label id="navbar_container" for="cd_input">
          <nav className="headernavbar">
            <ul>
              <li className="close_button" id="close_icon">
                <label className="" for="cd_input" id="closeBtn">
                  <IoIosClose />
                </label>
              </li>
              <li className="nav_li">
                <a className="nav_a" href="/">
                  <IoHomeOutline />
                  Home
                </a>
              </li>
              <li className="nav_li">
                <a className="nav_a" href="/products">
                  <AiOutlineProduct />
                  Products
                </a>
              </li>
              <li className="nav_li">
                <a className="nav_a" href="/search">
                  <IoMdSearch />
                  Search
                </a>
              </li>
              <li className="nav_li">
                <a className="nav_a" href="/loadertest">
                  Loader Test
                </a>
              </li>
            </ul>
          </nav>
        </label>
      </div>
    </>
  );
};

export default Header;
