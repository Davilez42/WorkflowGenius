const express = require("express")
const cors = require("cors")
const colors =  require('colors')
const fileupload = require('express-fileupload');
const FileController = require('./controllers/FileController');
const controllerUser = require('./routes/authRoutes')
const routeNotFoundHandler = require('./controllers/routeNotFoundHandler')
const logger = require('./middlewares/logger')
const serviceWebAccessToken = require('./middlewares/ServiceWebAccessToken')
const config = require('./config')
const app =  express()

const fileController = new FileController()
app.use(logger)
app.use(cors(config.CONFIG_CORS));

app.use(express.json());
app.use(express.urlencoded({ extended: true }) );
app.use(fileupload())
app.use(express.static('./uploads'))

app.use(controllerUser)
app.post("/upload_file",serviceWebAccessToken.validateToken,fileController.uploadFile)
app.use(routeNotFoundHandler)


app.listen(config.PORT,config.HOST,()=>{
    console.log(`Server Listen on: \n PORT:${config.PORT} \n HOST:${config.HOST}`);
})

