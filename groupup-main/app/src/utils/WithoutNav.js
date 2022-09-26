import React from "react";
import { Outlet } from "react-router";

/**
 *
 * @returns renders pages without navbar
 */
const WithoutNav = () => <Outlet />;

export default WithoutNav;
