const {getClientMongo} = require('./bd')
const {ObjectId} = require('mongodb')

const getDashboardByIdUser=async(id_user)=>{
    const client = getClientMongo()
    await client.connect()
    return  client.db('webadtasker').collection('dashboard').findOne({"id_aut":new ObjectId(id_user)})

}



module.exports = {getDashboardByIdUser}