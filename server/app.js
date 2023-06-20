const express = require("express")
const cors = require("cors")
const fileupload = require('express-fileupload');
const FileController = require('./src/controllers/FileController');
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const dashBoardRoutes = require('./src/routes/dashBoardRoutes')
const routeNotFoundHandler = require('./src/controllers/routeNotFoundHandler')
const logger = require('./src/middlewares/logger')
const serviceWebAccessToken = require('./src/middlewares/ServiceWebAccessToken')
const config = require('./src/configs/config')
const app =  express()

const fileController = new FileController()
app.use(logger)
app.use(cors(config.CONFIG_CORS));

app.use(express.json());
app.use(express.urlencoded({ extended: true }) );
app.use(fileupload())
app.use(express.static('./uploads'))

//RUTAS 
app.use(authRoutes)
//app.use(userRoutes)
app.use(dashBoardRoutes)

app.post("/upload_file",serviceWebAccessToken.validateToken,fileController.uploadFile)
app.use(routeNotFoundHandler)



module.exports = app