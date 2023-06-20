const {getClientMongo} = require('../services/bd')
const {ObjectId} = require('mongodb')

const getDashboardByIdUser=async(id_user)=>{
    const client = getClientMongo()
    await client.connect()

    return  client.db('webadtasker').collection('dashboard').findOne({"id_aut":new ObjectId(id_user)})

}

const insertTask = async(id_user,ses,task)=>{
    const client = getClientMongo()
    await client.connect()
    task["_id"] = new ObjectId()
    const t ={}
    t[ses]= task
    await  client.db('webadtasker').collection('dashboard').updateOne({"id_aut":new ObjectId(id_user)}, {$push:t})
    return task["_id"]
}

const changedStateTask =async (sesion,id_user,id_task)=>{
    console.log(sesion,id_task,id_user);
    const client = getClientMongo()
    await client.connect()
    const dashboard = await client.db('webadtasker').collection('dashboard').findOne({"id_aut":new ObjectId(id_user)})
    const tk = null
    const taskg = [...dashboard['todo'],...dashboard['inprocess'],...dashboard['completed']]
    
    for (const t of taskg) {
       console.log( t);
        if(t._id.toString() === id_task){
            tk = t
            break
        }
    }

    console.log(tk);
    if(sesion=="todo"){
        console.log("TODO");      
    }
    if (sesion=="inprocess") {
        
    }
    if (sesion=="completed") {
        
    }
}

module.exports = {getDashboardByIdUser,insertTask,changedStateTask}