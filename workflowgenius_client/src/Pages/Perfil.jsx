import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function Perfil() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("loggedUser"));
  });

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
