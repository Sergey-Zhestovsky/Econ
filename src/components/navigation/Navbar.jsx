import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "./SignedInLinks";
import SignedOut from "./SignedOutLinks";

import "../../css/navbar.css";

function Navbar(props) {
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
          {
            props.isAuthorize
              ? <SignIn />
              : <SignedOut />
          }
        </div>
      </div>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    isAuthorize: state.auth.isAuthorize
  };
}

export default connect(mapStateToProps)(Navbar);