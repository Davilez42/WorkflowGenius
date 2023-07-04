const {getClientMongo} = require('./bd')
const {ObjectId} = require('mongodb')

const getDashboardsByIdUser=async(id_user)=>{
    const client = getClientMongo()
    await client.connect()
    return  client.db('webadtasker').collection('dashboards').find({"id_aut":new ObjectId(id_user)}).toArray()
}

const creatNewDashboard = async(nombre,descripcion,id_user)=>{
    const client = await getClientMongo().connect()
    dash = {
            id_aut:new ObjectId(id_user),
            nombre,
            descripcion,
            sesions:[
                {
                    _id:new ObjectId(),
                    nombre:"Todo",
                    tasks:[
                        {
                            _id:new ObjectId(),
                            title:"Welcome !",
                            descripcion:"First task"
                        }
                    ]
                }
                ,{
                    _id:new ObjectId(),
                    nombre:"In Progress",
                    tasks:[
                        
                    ]

                }
                ,{
                    _id:new ObjectId(),
                    nombre:"Terminate",
                    tasks:[
                        
                    ]

                }
            ]

    }
    resp =  await  client.db('webadtasker').collection('dashboards').insertOne(dash)
    dash["_id"]=resp.insertedId
    return dash
 
}   


module.exports = {getDashboardsByIdUser,creatNewDashboard}