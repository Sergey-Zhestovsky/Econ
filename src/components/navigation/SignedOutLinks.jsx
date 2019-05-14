import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function SignedOutLinks(props) {
  return (
    <React.Fragment>
      <NavLink to="/signup" className="navbar_menu-item">Sign Up</NavLink>
      <NavLink to="/signin" className="navbar_menu-item">Sign In</NavLink>
    </React.Fragment>
  );
}