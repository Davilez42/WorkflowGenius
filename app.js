const express = require("express")
const router =  express.Router()
const cors = require("cors")
const colors = require("colors");
const fileupload = require('express-fileupload');
const FileController = require('./routes/FileController');
const fs =  require('fs/promises')
//creo objeto
const fileController = new FileController()
const app =  express()


app.use(cors());
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
app.get("/", async (req,res)=>{
   res.sendFile('./public/index.html',{root:__dirname})    
})


app.post("/upload_file",fileController.uploadFile)


 
//Manejo de errores
app.use((req,resp)=>{

    resp.status(404).header({"auth":"null","Content-Type":"application/json"}).json({ "error":"La ruta solicitada no se encuentra en el servidor"})
})
app.listen("5000")
console.log("Listen on Port: 5000" )
