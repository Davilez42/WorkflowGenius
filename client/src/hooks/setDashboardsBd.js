
export async function setDashboardDb(f,nombre,dash){
    //inserto en la base de datos
    const user = JSON.parse(window.localStorage.getItem("LoggedUser"))
    const respuesta  = await fetch(`http://192.168.1.7:5000/api/v1/newDashboard/user/${user.id_user}/name/${nombre}`,{
        method:"POST",
        headers:{"auth":user.token},
        mode:"cors"
    })
    if(respuesta.ok){
        const data = await respuesta.json()
        console.log(data);
        f([...dash,data])
    }else{ 
        alert(`No se pudo agregar el nuevo tablero "${nombre}" debido  un error interno`)
    }



    
}