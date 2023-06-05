const {getClientMongo} = require('../util/bd')
const {haspassword} = require('../services/serviceHashPassword')


const getUser = async(username)=>{
        const client = getClientMongo()
        await client.connect()
        return client.db('webadtasker').collection("users").findOne({username})     
}

const insertUser = async(datos)=> {
        const client = getClientMongo()
        await client.connect()
      
        const respuesta = await client.db('webadtasker').collection("users").find({$or:[{"username":datos.username},{"email":datos.email}]} ).toArray()       
        const us_ = respuesta.filter(d=>d.username===datos.username)
        const email_ = respuesta.filter(d=>d.email===datos.email)

        if(us_.length>0){
                return {"succes":false,"value":"username"}
        }
        if(email_.length>0){
                return {"succes":false,"value":"email"}
        }

        datos["created_at"]= new Date();
        datos["state_user"]=true;
        datos["recent_sesion"]= new Date();
        datos["id_avatar"]="default.png";
        const hashed_password = await haspassword(datos["password"])
        datos["password"] = hashed_password;
        const resp_insert = await client.db('webadtasker').collection("users").insertOne(datos) 
        return {"succes":true,resp_insert}
}
module.exports = {
        getUser,insertUser
}