

export default async function loginHandlerService(username, password, setError, handlerAction) {
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