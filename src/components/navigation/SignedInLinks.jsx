import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function SignedInLinks(props) {
  return (
    <React.Fragment>
      <NavLink to="/moderation" className="navbar_menu-item">Moderation</NavLink>
      <button className="navbar_menu-item">Log Out</button>
      <button className="navbar_menu-item">
        <div className="basket">BB</div>
      </button>
    </React.Fragment>
  );
}