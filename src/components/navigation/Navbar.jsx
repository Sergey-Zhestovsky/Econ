import React from "react";
import { Link, NavLink } from "react-router-dom";
import SignIn from "./SignedInLinks";
import SignedOut from "./SignedOutLinks";

import "../../css/navbar.css";

export default function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="navbar_menu container">
        <Link to="/" className="navbar_logo">
          <img className="navbar_logo-img" src="/img/econ-logo.png" alt="Econ" />
        </Link>
        <div className="navbar_menu-list">
          <NavLink exact to="/" className="navbar_menu-item">Main</NavLink>
          <NavLink to="/products" className="navbar_menu-item">Products</NavLink>
          <NavLink to="/selector" className="navbar_menu-item">Selector</NavLink>
          <SignIn />
          <SignedOut />
        </div>
      </div>
    </nav>
  );
}