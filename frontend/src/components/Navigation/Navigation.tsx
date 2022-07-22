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
      <NavLink className="nav-item nav-link" to="./spielerliste">
        <i className="bi-people"></i>
      </NavLink>
      <NavLink className="nav-item nav-link" to="./">
        <i className="bi-bar-chart-line"></i>
      </NavLink>
      <NavLink className="nav-item nav-link" to="./vergehensliste">
        <i className="bi-file-text-fill"></i>
      </NavLink>
      <NavLink className="nav-item nav-link" to="./bezahlen">
        <i className="bi-cash-coin text-success green"></i>
      </NavLink>
      <NavLink className="nav-item nav-link" to="./bestrafen">
        <i className="bi-file-fill text-warning yellow"></i>
      </NavLink>
    </nav>
  );
}

export default Navigation;
