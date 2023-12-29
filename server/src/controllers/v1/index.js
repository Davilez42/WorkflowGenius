//tools
const authProcedures = require("../../responseTemplate/responseServer/auth.procedure");
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
    signUser: signUser(services, tools, authProcedures),
    signUpUser: signUpUser(services, tools, authProcedures),
    createDashboard: createDashboard(services),
    getDashboards: getDashboards(services),
    deleteDashboard: deleteDashboard(services)
}