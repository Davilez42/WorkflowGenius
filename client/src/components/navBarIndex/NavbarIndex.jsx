import { NavLink } from "react-router-dom";
import { FcWorkflow } from "react-icons/fc";
import "../navbar/navbar.css";
export default function NavbarIndex() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <FcWorkflow size="25px" />
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                WorKflowGenius
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
