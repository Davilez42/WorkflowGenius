import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { UserContext } from "../../context/auth/userContext";
import useUser from "../../hooks/useUser";
import "./forms.css";

export default function Register() {
  const navigate = useNavigate();
  const { setState } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_names, setFirstNames] = useState("");
  const [last_names, setLastNames] = useState("");
  const [textMessage, setErrorMessage] = useState("");
  const { userRegisterSubmit } = useUser();

  const handlerAction = () => {
    setState(true);
    navigate("/home/main/dashboards");
  };
  const handlerSubmit = () => {
    userRegisterSubmit(
      { username, password, first_names, last_names, email },
      {
        setEmail,
        setFirstNames,
        setLastNames,
        setPassword,
        setUsername,
        handlerAction,
        setErrorMessage,
      }
    );
  };

  return (
    <>
      <div className="container_form">
        <form>
          <h3>Crear cuenta</h3>
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
          <label htmlFor="input_lastNames">Apellidos</label>
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
            <p>{textMessage}</p>
          </div>
          <div
            className="btn"
            onClick={() => {
              handlerSubmit();
            }}
          >
            registrar
          </div>
        </form>
        <div className="box_info">
          <p>
            Ya tienes una cuenta ?{" "}
            <NavLink className="here" to="/login">
              Inicia aqui
            </NavLink>{" "}
          </p>
        </div>
      </div>
    </>
  );
}
