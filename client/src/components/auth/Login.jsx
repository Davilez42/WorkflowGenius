import { React, useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./forms.css";
import loginHandlerService from "../../services/loginHandler.service";
import { UserContext } from "../../context/auth/userContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setError] = useState("");
  const { state, setState } = useContext(UserContext);
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

  const senDate = () => {
    if (username.trim() === "") {
      setError("Porfavor ingrese un nombre de usuario");
      return;
    }
    if (password.trim() === "") {
      setError("Porfavor ingrese una contraseña");
      return;
    }
    loginHandlerService(username, password, setError, handlerAction);
  };

  return (
    <>
      <div className="container_form">
        <form>
          <h3>Sign in</h3>
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
          <NavLink to="/">Olvidastes tu contraseña?</NavLink>
          <br />
          <div className="container_message">
            <p>{message}</p>
          </div>
          <div onClick={senDate} className="btn">
            Login
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
            Don't have an account ?{" "}
            <NavLink className="here" to="/register">
              Register here
            </NavLink>{" "}
          </p>
        </div>
      </div>
    </>
  );
}
