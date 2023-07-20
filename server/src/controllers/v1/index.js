// USER CONTROLLERS
const loginUser =  require('./auth/loginController')
const registerUser =  require('./auth/register.controller')
// DASHBOARD CONTROLLER
const createDashboard  = require('./dashboard/createDashboard.controller')
const getDashboards  = require('./dashboard/getDashboard.controller')

module.exports = {
    loginUser,
    registerUser,
    createDashboard,
    getDashboards
}