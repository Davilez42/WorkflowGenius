const Router = require('express')
const controllers = require('../../controllers/v1/index')
const validators = require('../../middlewares/paramsValidators.js')
const { validateToken } = require('../../middlewares/validateToken')

//decorators 
const authDecorator = require('./auth.routes.js')
const dashboardDecorator = require('./dashboard.routes.js')

//routes
const auth = Router()
const dashboard = Router()

const appRoutesV1 = Router()
appRoutesV1.get('/', (req, res) => { return res.json({ "message": "Welcome To 📕 WorkflowGenius  routes v1 !" }) })
appRoutesV1.use('/user', authDecorator(auth, controllers, validators))
appRoutesV1.use('/dashboard', dashboardDecorator(dashboard, controllers, validators, validateToken))

module.exports = appRoutesV1