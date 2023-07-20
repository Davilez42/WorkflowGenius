// USER CONTROLLERS
const signUser =  require('./auth/sign.Controller')
const signUpUser =  require('./auth/signUp.controller')
// DASHBOARD CONTROLLER
const createDashboard  = require('./dashboard/createDashboard.controller')
const getDashboards  = require('./dashboard/getDashboard.controller')

module.exports = {
    signUser,
    signUpUser,
    createDashboard,
    getDashboards
}