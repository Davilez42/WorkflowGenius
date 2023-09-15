export default async function RegisterHandler(body, handlerAction, setError) {
    console.log(body)
    const response = await fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_VERSION + '/user/signup_user',
        {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include',
        })
    const data = await response.json()
    if (data.success) {
        window.sessionStorage.setItem('loggedUser', JSON.stringify(data.data))
        handlerAction()
    } else {
        //console.log(data)
        if (data.status === 'USERNAME_ALREADY_EXIST') {
            setError('El username ya existe');
        }
        if (data.status === 'EMAIL_ALREADY_EXIST') {
            setError('El email ya existe');
        }

        setError('!Ops tenemos problemas internos..')
    }
}