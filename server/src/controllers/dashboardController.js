const serviceDashboards = require('../services/dashboards.service')

const getDashboard = async(req,res)=>{   
    try {
        const id_user = req.params.id_user
        const respuesta =   await serviceDashboards.getDashboardsByIdUser(id_user)
        return res.status(200).json(respuesta)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const newDashboard = async(req,res)=>{
try {
    const name = req.params.name_dashboard
    const id_user = req.params.id_user 
    if(name.trim()=== ""){
        throw new Error("Error: El parametro :name_dashboard esta vacio")
    }
    if(isNaN(parseInt(id_user))){
        throw new Error("Error: El parametro :id_user esta vacio")
    }
    const dashb_new = await serviceDashboards.creatNewDashboard(name,"",id_user)
    console.log(dashb_new);
    return res.status(200).json(dashb_new)
} catch (error) {
    console.log(error.message);
}
}
module.exports = {getDashboard,newDashboard};