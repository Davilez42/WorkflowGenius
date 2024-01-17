import useInput from "./useInputError";
import resoruce from "../services/resource";

export default function useUser() {
    const { setInputErrorStyle } = useInput();
    const userLoginSubmit = async (user, password, callback) => {
        try {
            if (user.trim() === "") {
                setInputErrorStyle('username')
                callback(undefined, "Porfavor ingrese un nombre de usuario");
                return;
            }
            if (password.trim() === "") {
                setInputErrorStyle('password')
                callback(undefined, "Porfavor ingrese un nombre de usuario");
                return;
            }
            const resp = await resoruce({ route: 'user/sign_user', body: { username: user, password }, method: 'POST' });
            const data = await resp.json()

            if (!resp.ok) {
                callback(undefined, data.errorMessage)
                return
            }
            //verifico si no hubo exito y verifico el estado
            if (!data.success) {
                if (data.status === 'USERNAME_NOT_EXIST') {
                    callback(undefined, 'El usuario no existe')
                }
                if (data.status === 'PASSWORD_INCORRECT') {
                    callback(undefined, 'Contraseña incorrecta')
                }
                return
            }
            callback(data)
        } catch (e) {
            callback(undefined, e.message)
        }
    }

    const userRegisterSubmit = async (userdata, callback) => {
        const { password, username, email, last_names, first_names } = userdata
        try {

            if (first_names.trim() === "") {
                callback(undefined, "El nombre es incorrecto");
                setInputErrorStyle('firstNames')
                return;
            }
            if (last_names.trim() === "") {
                callback(undefined, "El apellido es incorrecto");
                setInputErrorStyle('lastNames')
                return;
            }
            if (username.trim() === "") {
                callback(undefined, "El username es requerido");
                setInputErrorStyle('username')
                return;
            }
            if (email.trim() === "") {
                callback(undefined, "El email es incorrecto");
                setInputErrorStyle('email')
                return;
            }

            if (password.trim() === "" || password.length < 8) {
                setInputErrorStyle('password')
                callback(undefined, "La contraseña es demasiado corta");
                return;
            }
            const resp = await resoruce({ route: 'user/signup_user', method: 'POST', body: userdata })
            const data = await resp.json()

            if (!resp.ok) {
                return callback(undefined, data.errorMessage)
            }
            if (!data.success) {
                if (data.status === 'EMAIL_ALREADY_EXIST') {
                    return callback(undefined, 'el correo electronico ya esta en uso')
                }
                if (data.status === 'USERNAME_ALREADY_EXIST') {
                    return callback(undefined, 'el nombre de usuario ya esta en uso')
                }
            }
            callback(data)
        } catch (e) {
            callback(undefined, e.message)
        }
    }


    return {
        userLoginSubmit,
        userRegisterSubmit
    }
}

