

const dashboardNotFound = (message) => ({
    succes: false,
    status: "DASHBOARD_NOT_FOUND",
    message: "the dashboard does not exist"
})

const insufficientPermits = (message) => ({
    succes: false,
    status: "INSUFFICIENT_PERMITS_ON_DASHBAORD",
    message: "insufficient permissions in the control panel"
})

module.exports = {
    dashboardNotFound,
    insufficientPermits
}