// import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./top.css";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: "white",
  fontSize: "20px",
};

const TopBar = () => {
  return (
    <div>
      <div id="top">
        <p id="p">
          <FaPhoneAlt size={14} />
          &nbsp; Phone number
          <a class="a" href="https://facebook.com">
            <BsFacebook size={20} color={"white"} />
            &nbsp; &nbsp;
          </a>
          <a class="a" href="https://linkedin.com">
            <BsLinkedin size={20} color={"white"} />
            &nbsp; &nbsp;
          </a>
          <a class="a" href="https://instagram.com">
            <FaInstagram size={20} color={"white"} />
            &nbsp; &nbsp;
          </a>
          <a class="a" href="https://X.com">
            <FaSquareXTwitter size={20} color={"white"} />
            &nbsp; &nbsp;
          </a>
        </p>
        {/* <li class="bar">
          <b>BLOGGING</b>
        </li> */}
        <nav id="nav">
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Link to="/get/upload" style={linkStyle}>
            Add Blog
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;
