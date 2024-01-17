//tools
const userResponses = require("../../responseTemplate/user.responses");
const dashboardResponses = require("../../responseTemplate/dashboard.responses")
const tools = require("../../tools/")

//SERVICES DB
const services = require('../../database/services/')
// USER CONTROLLERS
const signUser = require('./auth/sign.Controller')
const signUpUser = require('./auth/signUp.controller')
// DASHBOARD CONTROLLER
const createDashboard = require('./dashboard/createDashboard.controller')
const getDashboards = require('./dashboard/getDashboard.controller')
const deleteDashboard = require('./dashboard/deleteDashboard.controller')

//INYECTO DEPENDENCIAS
module.exports = {
    signUser: signUser(services, tools, userResponses),
    signUpUser: signUpUser(services, tools, userResponses),
    createDashboard: createDashboard(services, dashboardResponses),
    getDashboards: getDashboards(services, dashboardResponses),
    deleteDashboard: deleteDashboard(services, dashboardResponses)
}