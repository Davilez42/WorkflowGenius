export default async function  LoguinHandler(username,password,handlerMessage,handlerAction){
   const datos = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify({ username, password}),
      };
    const respuesta =  await fetch('http://localhost:5000/api/v1/user/sign_user',datos)
        if (respuesta.ok) {
            const user = await respuesta.json()          
            if(user.succes){
                window.sessionStorage.setItem('loggedUser',JSON.stringify(user))
                handlerAction(user.data.id_user)   
            }else{
                if(user.status==="USERNAME_NOT_EXIST"){
                    handlerMessage('El usuario no existe')
                }
                if(user.status==="PASSWORD_INCORRECT"){
                    handlerMessage('Contraseña Incorrecta')
                }
                
                return;
            }       
        }
        else{
            const json = await  respuesta.json()
            alert(json.messageError)
        }
 }