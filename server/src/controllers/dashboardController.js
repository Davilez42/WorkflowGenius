const repositoryDashboard = require('../models/repositoryDashboard')

const getDashboard = async(req,res)=>{
    
    try {
        const id_user = req.params.id_user
       const resp = await repositoryDashboard.getDashboardByIdUser(id_user)
       console.log(resp);
        return res.status(200).json(resp)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const changedStateTask = async(req,res)=>{ 
    try {
        const sesion =  req.params.sesion
        const id_user = req.params.id_user
        const id_task = req.params.id_task

        
        await repositoryDashboard.changedStateTask(sesion,id_user,id_task)

        return res.sendStatus(200)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const insertTask = async(req,res)=>{
    try {
        const sesion =  req.params.sesion
        const id_user =  req.params.id_user       
        const task = req.body

        if (!["todo","inprocess","completed"].includes(sesion)) {
            throw new Error("Porfavor ingrese una sesion valida")
        }
       
      const resp =   await repositoryDashboard.insertTask(id_user,sesion,task)

        return res.status(200).json({"id_task":resp})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}



module.exports = {getDashboard,changedStateTask,insertTask};