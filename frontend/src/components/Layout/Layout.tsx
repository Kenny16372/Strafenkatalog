import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Layout() {
  return (
    <>
      <div className="overflow-auto">
        <Outlet />
      </div>
      <Navigation />
    </>
  );
}

export default Layout;
