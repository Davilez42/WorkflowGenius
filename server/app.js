const express = require("express")
const router =  express.Router()
const cors = require("cors")
const colors = require("colors");
const fileupload = require('express-fileupload');
const FileController = require('./routes/FileController');
const fs =  require('fs/promises')
const repositoryUser = require('./Modules/repositoryUser.js')
const serviceHashPassword = require('./Modules/serviceHashPassword') 
const serviceWebAccessToken = require('./Modules/ServiceWebAccessToken')
//creo objeto
const fileController = new FileController()
const app =  express()


app.use(cors({
    origin:["http://localhost:3000"]
}));
app.use( express.json() );
app.use(express.urlencoded({ extended: true }) );
app.use(fileupload())

app.use(express.static('./uploads'))
app.use(express.static('./public'))

//Logger
app.use((req,res,next)=>{
    console.log(` IP: ${req.ip} :METHOD ${req.method.red}  url ${req.url}`)  
    next();
})



//Ruta Principal
app.post("/validate_user", async (req,res)=>{
   const user = req.body;
   try {
        const response_bd = await repositoryUser.getUser(user.username);
        //console.log(response_bd[0])
        if (response_bd[0].length==0) {
            return res.status(200).json({"username":[false,response_bd.username]})
        }    
        if(! serviceHashPassword.validateHash(response_bd[0][0].passwrd,user.password)){
            return res.status(200).json({"id_user":response_bd[0][0].id_user,"username":[true,response_bd[0][0].username],"password":false})
        }
        const token = serviceWebAccessToken.generateAccessToken(user);
        return res.status(200).json({"id_user":response_bd[0][0].id_user,"username":[true,response_bd[0][0].username],"password":true,"token":token})
   
    } catch (error) {
        //console.log(error)
        res.status(500).json({"messageError":error.message}); 
   }
})
app.post('/register_User',(req,res)=>{
   try {
    const datos =  req.body;
    for(key in datos){
        if(datos[key]===''){
            return res.status(500).json({"messageError":"campos vacios en el dato enviado"})
        }
    }
    repositoryUser.insertUser(datos)
    console.log(datos);
    return res.status(200).send("exitoso")
   } catch (error) {
    res.sendStatus(400);
   }
  
})








app.post("/upload_file",serviceWebAccessToken.validateToken,fileController.uploadFile)
//Manejo de errores
app.use((req,resp)=>{

    resp.status(404).header({"auth":"null","Content-Type":"application/json"}).json({ "error":"La ruta solicitada no se encuentra en el servidor"})
})
app.listen("5000")
console.log("Listen on Port: 5000" )
