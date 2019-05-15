import React from "react";
import { NavLink } from "react-router-dom";

export default function ModerationNavigationBar(props) {
  return (
    <div className="moderation_menu-list">
      <NavLink to="/goods" className="moderation_menu-elements">Goods</NavLink>
      <NavLink to="/types" className="moderation_menu-elements">Types</NavLink>
      <NavLink to="/countries" className="moderation_menu-elements">Countries</NavLink>
    </div>
  );
}