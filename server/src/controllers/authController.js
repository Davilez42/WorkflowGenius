const serviceUsers = require('../services/users.service')
const serviceHashPassword = require('../services/serviceHashPassword') 
const generateToken = require('../services/generateToken.service')

const validateUser = async (req,res)=>{   
    try {
        const user = req.body;
        if(user.username == undefined || user.password == undefined){
            throw new Error('Error: Entradas incorrectas')
        }
        if(user.username == '' || user.password == ''){
            throw new Error('Error: campos vacios')
        }
        if(user.username.split(' ').length>1 || user.password.split(' ').length>1){
            throw new Error('Error: formato incorrecto')
        }
         const response_bd = await serviceUsers.getUser(user.username);
         if (!response_bd) {
             return res.status(200).json({"username":[false,user.username]})
         }    
         if(! await serviceHashPassword.validateHash(response_bd.password,user.password)){
             return res.status(200).json({"id_user":response_bd._id,"username":[true,response_bd.username],"password":false})
         }
         const token = generateToken(user);
         return res.status(200).json({"id_user":response_bd._id,"username":[true,user.username],"password":true,"token":token}) 
    
     } catch (error) {
         res.status(500).json({"messageError":error.message}); 
    }
 }


 const registerUser = async(req,res)=>{
    try {
     const datos =  req.body;
     if(datos.username == undefined || datos.password == undefined || datos.first_name==undefined || datos.last_name==undefined || datos.email==undefined){
        throw new Error('Error: Entradas incorrectas')
    }
    if(datos.username == '' || datos.password == '' || datos.first_name=='' || datos.last_name=='' || datos.email==''){
        throw new Error('Error: campos vacios')
    }   
    if(datos.username.split(' ').length>1 || datos.password.split(' ').length>1 || datos.email.split(' ').length>1){
        throw new Error('Error: formato incorrecto')
    }
    const respuesta =  await  serviceUsers.insertUser(datos)
    if(!respuesta.succes){
        return res.status(200).json(respuesta)
    }
     const token = generateToken(datos);
     return res.status(200).json({"id_user":respuesta.resp_insert.insertedId,"username":[true,datos.username],"password":true,"token":token})
    } catch (error) {
         return res.status(500).json({"messageError":error.message})
    }
 }

module.exports = {validateUser,registerUser}