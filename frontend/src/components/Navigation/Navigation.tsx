import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav
      id="navigation"
      className="nav nav-pills nav-fill nav-justified w-100 fixed-bottom pb-1"
    >
      <NavLink className="nav-item nav-link" to="/strafenkatalog">
        <i className="bi-file-text"></i>
      </NavLink>
      <NavLink className="nav-item nav-link" to="./">
        center
      </NavLink>
      <NavLink className="nav-item nav-link" to="./">
        right
      </NavLink>
    </nav>
  );
}

export default Navigation;
