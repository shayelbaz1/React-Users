import React from "react";
import { Link, NavLink } from "react-router-dom";
const logo = require("../../assets/logo.png");
const userImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWSwL6QEGjHRyGx0Dv4tpZjxelnG2MWh1A-9MFs2rw9MZDG-gWgWj86z5e0prysSigS6I&usqp=CAU";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container col-12">
        <Link className="navbar-brand" href="/" to="/">
          <img src={logo} alt="ls-techs" width="131"></img>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex-center">
          <img className="user-img" src={userImg} alt="user img" width="32" />
          <p>Roni Bonim</p>
        </div>

        <Link className="mx-4" to="/signin">
          <i className="fas fa-sign-out-alt"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
