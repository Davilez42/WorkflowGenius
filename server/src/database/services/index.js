

//Tools
const { haspassword } = require("../../tools/hashPassword.tool");
const { dashboardTempleteModel, } = require("../../helpers/templeteModelDashboard");

// Models
const { dashBoardModel, userModel } = require('../Models')

//Services
const dashboardService = require('./dashboards.service')
const userService = require('./users.service')


module.exports = {
    dashboardService: dashboardService(dashBoardModel, dashboardTempleteModel),
    userService: userService(userModel, haspassword)
}


