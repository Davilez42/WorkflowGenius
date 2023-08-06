import { React, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./forms.css";
import loguinHandlerService from "../../services/loguinHandler.service";
export default function Loguin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handlerAction = (id_user) => {
    navigate(`/home/main/dashboards`);
  };

  const senDate = () => {
    if (username.trim() === "") {
      setMessage("Porfavor ingrese un nombre de usuario");
      return;
    }
    if (password.trim() === "") {
      setMessage("Porfavor ingrese una contraseña");
      return;
    }
    loguinHandlerService(username, password, setMessage, handlerAction);
  };

  return (
    <>
      <div className="container_form">
        <div className="container_message">
          <p>{message}</p>
        </div>
        <form>
          <h3>Sign in WorkflowGenius</h3>
          <label htmlFor="input_username">Username or email</label>
          <input
            id="input_username"
            onChange={(event) => setUsername(event.target.value)}
            className="input input-username"
            type="text"
            placeholder="Username"
          ></input>
          <label htmlFor="input_password">password</label>
          <input
            id="input_password"
            onChange={(event) => setPassword(event.target.value)}
            className="input input-password"
            type="password"
            placeholder="Password"
          ></input>
          <NavLink to="/">Forget you password?</NavLink>
          <br />
          <a onClick={senDate} className="btn">
            Loguin
          </a>
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
    </>
  );
}
