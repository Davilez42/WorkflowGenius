import { React, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavbarLeft from "./navBarLeft/NavbarLeft";
import { DashboardContextProvider } from "../context/DashboardContext";
import "./main.css";
import loadImage from "../loadRandomImage";

export default function Main() {
  useEffect(() => {
    loadImage();
  }, []);

  return (
    <DashboardContextProvider>
      <div className="container-main">
        <NavbarLeft />
        <Outlet />
      </div>
    </DashboardContextProvider>
  );
}
