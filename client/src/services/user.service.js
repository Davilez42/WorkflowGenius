export async function loginHandlerService(username, password, setError, handlerAction) {
    const datos = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
    };
    const response = await fetch('http://localhost:5000/api/v1/user/sign_user', datos)
    if (response.ok) {
        const user = await response.json()
        if (user.success) {
            window.sessionStorage.setItem('loggedUser', JSON.stringify(user))
            handlerAction(user.data.id_user)
        } else {
            if (user.status === "USERNAME_NOT_EXIST") {
                setError('El usuario no existe')
            }
            if (user.status === "PASSWORD_INCORRECT") {
                setError('Contraseña Incorrecta')
            }
            return;
        }
    }
    else {
        const json = await response.json()
        setError(json.messageError)
    }
}

export async function registerHandlerService(body, handlers) {
    console.log(body)
    const { setFirstNames, setErrorMessage, setLastNames, setEmail,
        setPassword, setUsername, handlerAction } = handlers;
    const response = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_VERSION + '/user/signup_user',
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })
    const data = await response.json()
    if (data.success) {
        setFirstNames("");
        setLastNames("");
        setPassword("");
        setEmail("");
        setUsername("");
        document.querySelector(".input-firstNames").value = "";
        document.querySelector(".input-lastNames").value = "";
        document.querySelector(".input-username").value = "";
        document.querySelector(".input-email").value = "";
        document.querySelector(".input-password").value = "";
        window.sessionStorage.setItem('loggedUser', JSON.stringify(data))
        handlerAction()
    } else {
        console.log(data)
        if (data.status === 'USERNAME_ALREADY_EXIST') {
            setErrorMessage('El username ya existe');

        }
        else if (data.status === 'EMAIL_ALREADY_EXIST') {
            setErrorMessage('El email ya existe');
        }
        else {
            setErrorMessage('!Ops tenemos problemas internos..')
        }
    }
}