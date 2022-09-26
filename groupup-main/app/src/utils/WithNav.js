import React from "react";
import NavBar from "./../components/Navbar";
import { Outlet } from "react-router";

/**
 * @returns Renders pages with navbar
 */
const WithNav = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default WithNav;
