import { React, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/auth/userContext";
import { useCookies } from "react-cookie";
import { IoIosLogOut } from "react-icons/io";
import "./navbarleft.css";

export default function NavbarDashboard() {
  const { setState } = useContext(UserContext);
  const [url_image, setUrl] = useState("");
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));
    setUrl(user?.data?.id_avatar);
  }, [url_image]);

  return (
    <div className="navBarDashboard">
      <nav>
        <ul>
          <img src={url_image} alt="" className="img-avatar" />
          <li>
            <NavLink
              to="/home/main/dashboards"
              style={{ textDecoration: "none" }}
            >
              Tableros
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/main/dashboards"
              style={{ textDecoration: "none" }}
            >
              Notificaciones
            </NavLink>
          </li>
          <li
            className="sign-off"
            onClick={() => {
              sessionStorage.removeItem("loggedUser");
              removeCookie("token");
              setState(false);
              navigate("/login");
            }}
          >
            <NavLink style={{ textDecoration: "none" }}>Cerrar sesion</NavLink>
            <IoIosLogOut size="20px" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
