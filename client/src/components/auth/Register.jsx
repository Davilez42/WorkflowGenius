import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { UserContext } from "../../context/auth/userContext";
import RegisterHandler from "../../services/registerHandler.service";
import "./forms.css";

export default function Register() {
  const navigate = useNavigate();
  const { setState } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_names, setFirstNames] = useState("");
  const [last_names, setLastNames] = useState("");

  const clearFields = () => {
    setFirstNames("");
    setLastNames("");
    setPassword("");
    setEmail("");
    setUsername("");
    setError("");
    document.querySelector(".input-firstNames").value = "";
    document.querySelector(".input-lastNames").value = "";
    document.querySelector(".input-username").value = "";
    document.querySelector(".input-email").value = "";
    document.querySelector(".input-password").value = "";
  };

  const handlerAction = () => {
    setState(true);
    clearFields();
    navigate("/home/main/dashboards");
  };

  const [error, setError] = useState("");
  const handlerSubmit = () => {
    setError("");

    if (first_names.trim() === "") {
      setError("El nombre es incorrecto");
      return;
    }
    if (last_names.trim() === "") {
      setError("El apellido es incorrecto");
      return;
    }
    if (email.trim() === "") {
      setError("El email es incorrecto");
      return;
    }

    if (username.trim() === "") {
      setError("El username es requerido");
      return;
    }
    if (password.trim() === "" || password.length < 8) {
      setError("La contraseña es demasiado corta");
      return;
    }
    setError("");

    RegisterHandler(
      {
        username,
        password,
        first_names,
        last_names,
        email,
      },
      handlerAction,
      setError
    );
  };

  return (
    <>
      <div className="container_form">
        <form>
          <h3>Create account</h3>
          <label htmlFor="input_firstNames">Nombres *</label>
          <input
            id="input_firstNames"
            className="input input-firstNames"
            type="text"
            placeholder="First names"
            onChange={(e) => {
              setFirstNames(e.target.value);
            }}
          ></input>
          <label htmlFor="input_lastNames">Apellidos </label>
          <input
            id="input_lastNames"
            className="input input-lastNames"
            type="text"
            placeholder="Last names"
            onChange={(e) => {
              setLastNames(e.target.value);
            }}
          ></input>
          <label htmlFor="input_username">Nombre de usuario *</label>
          <input
            id="input_username"
            className="input input-username"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              console.log(username);
              setUsername(e.target.value);
            }}
          ></input>
          <label htmlFor="input_email">Correo electronico *</label>
          <input
            id="input_email"
            className="input input-email"
            type="email"
            required
            placeholder="Email@some.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <label htmlFor="input_password">Contraseña *</label>
          <input
            id="input_password"
            className="input input-password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <div className="container_message">
            <p>{error}</p>
          </div>
          <div
            className="btn"
            onClick={() => {
              handlerSubmit();
            }}
          >
            Register
          </div>
        </form>
        <div className="box_info">
          <p>
            Already have an account ?{" "}
            <NavLink className="here" to="/login">
              Login here
            </NavLink>{" "}
          </p>
        </div>
      </div>
    </>
  );
}
