
import { loginHandlerService, registerHandlerService } from "../services/user.service";
import useInput from "./useInputError";
export default function useUser() {
    const { setInputErrorStyle } = useInput();
    const userLoginSubmit = (user, password, { setErrorMessage, handlerAction }) => {
        if (user.trim() === "") {
            setInputErrorStyle('username')
            setErrorMessage("Porfavor ingrese un nombre de usuario");
            return;
        }
        if (password.trim() === "") {
            setInputErrorStyle('password')
            setErrorMessage("Por favor ingrese una contraseña");
            return;
        }
        loginHandlerService(user, password, setErrorMessage, handlerAction);
    }

    const userRegisterSubmit = async (data, handlers) => {
        const { password, username, email, last_names, first_names } = data
        const { setErrorMessage } = handlers;
        setErrorMessage("");
        if (first_names.trim() === "") {
            setErrorMessage("El nombre es incorrecto");
            setInputErrorStyle('firstNames')
            return;
        }
        if (last_names.trim() === "") {
            setErrorMessage("El apellido es incorrecto");
            setInputErrorStyle('lastNames')
            return;
        }
        if (email.trim() === "") {
            setErrorMessage("El email es incorrecto");
            setInputErrorStyle('email')
            return;
        }
        if (username.trim() === "") {
            setErrorMessage("El username es requerido");
            setInputErrorStyle('username')
            return;
        }
        if (password.trim() === "" || password.length < 8) {
            setInputErrorStyle('password')
            setErrorMessage("La contraseña es demasiado corta");
            return;
        }
        setErrorMessage("");
        registerHandlerService(
            {
                username,
                password,
                first_names,
                last_names,
                email,
            },
            handlers
        );
    }
    return {
        userLoginSubmit,
        userRegisterSubmit
    }
}

