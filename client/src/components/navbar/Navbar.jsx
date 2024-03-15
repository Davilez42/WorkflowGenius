import { NavLink } from "react-router-dom";
import { SiClarifai } from "react-icons/si";
import "./navbar.css";
export default function Navbar() {
  return (
    <>
      <header className="block-header">
        <nav className="block-header__container-nav">
          <ul>
            <li className="block-header__nav-bar-item nav-bar-item">
              <SiClarifai size={20} />
              <NavLink
                className="block-header__item-text tittle-app"
                to="/login"
                style={{ textDecoration: "none" }}
              >
                WorKflowGenius
              </NavLink>
            </li>
            <li className="block-header__nav-bar-item nav-bar-item">
              <NavLink
                className="block-header__item-text"
                to="/home/main/dashboards"
                style={{ textDecoration: "none" }}
              >
                Inicio
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
