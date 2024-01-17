const loginParamsValidator = require('./loguinUser.validator')
const registerParamsValidator = require('./registerUser.validator')
const createDashParamValidator = require('./createDashboard.validator')
const deleteDashParamValidator = require('./deleteDashboard.validator')
module.exports = {
    loginParamsValidator,
    registerParamsValidator,
    createDashParamValidator,
    deleteDashParamValidator
}