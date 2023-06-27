const serviceDashboards = require('../services/dashboards.service')

const getDashboard = async(req,res)=>{
    
    try {
        const id_user = req.id_user 
        const respuesta =   await serviceDashboards.getDashboardByIdUser(id_user)
        return res.status(200).json(respuesta)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const newDashboard = async()=>{
    try {
        //TODO
        console.log(req.params.id_user,req.params.id_dashboard);
    } catch (error) {
        
    }
}



module.exports = {getDashboard,newDashboard};