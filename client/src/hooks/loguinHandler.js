import {React,useState} from 'react'
import {useNavigate} from 'react-router-dom'
export default async function  LoguinHandler(username,password,handlerMessage,handlerAction){
   const datos = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password}),
      };

    const respuesta =  await fetch('http://192.168.1.7:5000/api/v1/validateuser',datos)
        if (respuesta.ok) {
            const user = await respuesta.json()
            if (user.username[0]) {
                if (!user.password) {
                    handlerMessage("La Contraseña es incorrecta")
                    return
                }
                window.sessionStorage.setItem('LoggedUser',JSON.stringify(user)) ; 
                handlerAction(user.id_user)        
            }
            else{
                handlerMessage("El usuario No existe")
            }          
        }
        else{
            const json = await  respuesta.json()
            alert(json.messageError)
        }
 }