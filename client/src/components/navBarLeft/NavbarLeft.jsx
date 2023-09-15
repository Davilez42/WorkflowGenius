import { React, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/auth/userContext";
import { useCookies } from "react-cookie";
import { IoIosLogOut } from "react-icons/io";
import "./navbarleft.css";
export default function NavbarDashboard() {
  const { setState } = useContext(UserContext);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const user = JSON.parse(sessionStorage.getItem("loggedUser"));
  return (
    <div className="navBarDashboard">
      <nav>
        <ul>
          <img src={user?.data?.id_avatar} alt="" className="img-avatar" />
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
              Mensajes
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
            <NavLink style={{ textDecoration: "none" }}>cerrar Sesion</NavLink>
            <IoIosLogOut size="20px" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
