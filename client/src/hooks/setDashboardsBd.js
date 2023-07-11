
export async function setDashboardDb(f,nombre,dash){
    //inserto en la base de datos
    const user = JSON.parse(window.sessionStorage.getItem("LoggedUser"))
    const respuesta  = await fetch(`http://192.168.1.21:5000/api/v1/newDashboard/user/${user._id}/name/${nombre}`,{
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