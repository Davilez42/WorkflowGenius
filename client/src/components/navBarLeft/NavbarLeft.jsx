import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { IoIosLogOut } from "react-icons/io";
import "./navbarleft.css";

export default function NavbarDashboard() {
  const [url_image, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("wttf"));
    setUrl(user?.id_avatar);
  }, []);

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
          {/*         <li>
            <NavLink
              to="/home/main/dashboards"
              style={{ textDecoration: "none" }}
            >
              Notificaciones
            </NavLink>
          </li> */}
          <li
            className="sign-off"
            onClick={() => {
              sessionStorage.removeItem("csrftoken");
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
