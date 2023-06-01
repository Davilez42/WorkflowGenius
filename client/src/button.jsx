
import PropTypes from 'prop-types'


const loguinHandler = async ()=>{
    const username = document.querySelector('#input_username').value
    const password = document.querySelector('#input_password').value
    if (username === ''){
        alert('Por Favor ingrese un nombre de usuario')
        return
    }
    if (password === ''){
        alert('Por Favor ingrese una contraseña')
        return
    }
   const datos = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password}),
      };
 
    const respuesta =  await fetch('http://localhost:5000/validate_user',datos)
        if (respuesta.ok) {
            const user = await respuesta.json()
            if (user.username[0]) {
                console.log(user)
                if (!user.password) {
                    alert("La Contraseña es incorrecta")
                    return
                }
                window.localStorage.setItem('LoggedUser',JSON.stringify(user)) ;
            }
            else{
                alert("El usuario No existe")
            }
            
            
        }
        else{
            const json = await  respuesta.json()
            alert(json.messageError)
        }
 }




export const Button = ({handler_view,value,id})=>{
    const registerHandler = ()=>{
        handler_view(12)
        alert('enviando datos de registro')
    }
    return <input onClick={id === "btn_loguin" ?  loguinHandler :registerHandler } className="btn" id={id} type="button" value={value}></input>
}


Button.propTypes = {
    value:PropTypes.string.isRequired,
    id:PropTypes.string.isRequired
}