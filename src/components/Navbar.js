import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaCrow } from "react-icons/fa";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: "white",
  fontSize: "24px",
};

const Navbar = () => {
  return (
    <nav id="nav">
      <ul>
        {/* <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li> */}
        <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/details" style={linkStyle}>
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
