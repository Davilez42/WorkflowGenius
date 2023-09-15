import { React, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

import { UserContext } from "../context/auth/userContext";

export default function Perfil() {
  const { state, setState } = useContext(UserContext);
  const navigate = useNavigate();

  const handler = (route) => {
    navigate(route);
  };

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("loggedUser"));
    if (!state) {
      if (user) {
        setState(true);
        return;
      }
      handler("/login");
    }
  });

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
