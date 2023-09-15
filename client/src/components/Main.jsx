import { React, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavbarLeft from "./navBarLeft/NavbarLeft";
import { DashboardContextProvider } from "../context/Dashboard/DashboardContext";
import "./main.css";

export default function Main() {
  return (
    <DashboardContextProvider>
      <div className="container-main">
        <NavbarLeft />
        <Outlet />
      </div>
    </DashboardContextProvider>
  );
}
