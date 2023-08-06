import { React } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbarleft.css";
export default function NavbarDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("loggedUser"));
  return (
    <div className="navBarDashboard">
      <nav>
        <ul>
          <img src={user.data.id_avatar} alt="" className="avatar" />
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
              ayuda
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                sessionStorage.removeItem("LoggedUser");
                navigate("/loguin");
              }}
              style={{ textDecoration: "none" }}
            >
              cerrarSesion
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
