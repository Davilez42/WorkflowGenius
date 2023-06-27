const express = require("express")
const cors = require("cors")
require('colors')
const authRoutes = require('./src/routes/authRoutes')
const dashBoardRoutes = require('./src/routes/dashBoardRoutes')
const routeNotFoundHandler = require('./src/controllers/routeNotFoundHandler')
const logger = require('./src/middlewares/logger')
const config = require('./src/configs/config')
const app =  express()
app.use(logger)
app.use(cors(config.CONFIG_CORS));

app.use(express.json());
app.use(express.urlencoded({ extended: true }) );

//RUTAS 
app.use(authRoutes)
app.use(dashBoardRoutes)

app.use(routeNotFoundHandler)



module.exports = app