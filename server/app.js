const express = require("express")
const cors = require("cors")
require('colors')

const routesv1 = require('./src/v1/routes/index')
const routeNotFoundHandler = require('./src/controllers/routeNotFoundHandler')
const logger = require('./src/middlewares/logger')
const config = require('./src/configs/config')
const app =  express()

app.use(logger)
app.use(express.json());
app.use(express.urlencoded({ extended: true }) );

//RUTAS 
app.use(cors(config.CONFIG_CORS));
app.get('/',(req,res)=>{return res.json({"message":"Welcome To Server !"})})
app.use('/api/v1',routesv1)

app.use(routeNotFoundHandler)



module.exports = app