import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./forms.css";
import useUser from "../../hooks/useUser";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textMessage, setErrorMessage] = useState("");

  const { userLoginSubmit } = useUser();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handlerSubmit = () => {
    userLoginSubmit(username, password, (user, err) => {
      if (err) {
        return setErrorMessage(err);
      }
      console.log(user);
      window.sessionStorage.setItem("csrftoken", user.csrftoken);
      window.localStorage.setItem("wttf", JSON.stringify(user.data));
      navigate("/home/main/dashboards");
    });
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
          {
            //TODO
          }
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
