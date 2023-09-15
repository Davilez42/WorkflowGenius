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
      <div className="mainForms">
        <div className="container_form">
          <form>
            <h3>Sign in</h3>

            <input
              id="input_username"
              onChange={(event) => setUsername(event.target.value)}
              className="input input-username"
              type="text"
              placeholder="Username"
            ></input>

            <input
              id="input_password"
              onChange={(event) => setPassword(event.target.value)}
              className="input input-password"
              type="password"
              placeholder="Password"
            ></input>
            <NavLink to="/">Forget you password?</NavLink>
            <br />
            <div onClick={senDate} className="btn">
              Login
            </div>
            <div className="container_message">
              <p>{message}</p>
            </div>
          </form>
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
