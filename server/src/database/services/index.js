

//Tools
const { haspassword } = require("../../tools/hashPassword.tool");
const { dashboardTemplateModel, } = require("../../helpers/templateModelDashboard");

// Models
const { dashBoardModel, userModel } = require('../Models')

//Services
const dashboardService = require('./dashboards.service')
const userService = require('./users.service')


module.exports = {
    dashboardService: dashboardService({ dashBoardModel, userModel }, dashboardTemplateModel),
    userService: userService(userModel, haspassword)
}


