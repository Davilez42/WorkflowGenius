import { React, useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./forms.css";
import { UserContext } from "../../context/auth/userContext";
import useUser from "../../hooks/useUser";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textMessage, setErrorMessage] = useState("");
  const { state, setState } = useContext(UserContext);
  const { userLoginSubmit } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      handlerAction();
    }
  }, []);

  const handlerAction = (id_user) => {
    setState(true);
    navigate(`/home/main/dashboards`);
  };

  const handlerSubmit = () => {
    userLoginSubmit(username, password, { handlerAction, setErrorMessage });
  };

  return (
    <>
      <div className="container_form">
        <form>
          <h3>Ingresar</h3>
          <label htmlFor="input_username"> Usuario o correo</label>
          <input
            id="input_username"
            onChange={(event) => setUsername(event.target.value)}
            className="input input-username"
            type="text"
            placeholder="Username"
          ></input>
          <label htmlFor="input_password">Contraseña</label>
          <input
            id="input_password"
            onChange={(event) => setPassword(event.target.value)}
            className="input input-password"
            type="password"
            placeholder="Password"
          ></input>
          <div className="container_message">
            <p>{textMessage}</p>
          </div>
          <div className="container_forget_password">
            <NavLink id="forget_password" to="/">
              Olvidastes tu contraseña?
            </NavLink>
          </div>
          <div onClick={handlerSubmit} className="btn">
            iniciar
          </div>
        </form>
        <div className="container_btn_google">
          <div
            id="g_id_onload"
            data-client_id="585334348569-4cln0bonf18g5dpd3jbbnjh1b1nv4vjj.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="http://localhost:5000/"
            data-itp_support="true"
          ></div>

          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
          ></div>
        </div>
        <div className="box_info">
          <p>
            No tienes una cuenta?{" "}
            <NavLink className="here" to="/register">
              Registrate aqui
            </NavLink>{" "}
          </p>
        </div>
      </div>
    </>
  );
}
