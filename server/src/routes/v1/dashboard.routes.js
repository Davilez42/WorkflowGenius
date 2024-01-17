module.exports = (route, controllers, validators, validateToken) => {

    route.get('/get_dashboard', validateToken, controllers.getDashboards)
    route.put('/create_dashboard', validateToken, validators.createDashParamValidator, controllers.createDashboard)
    route.delete('/delete_dashboard/:id_dashboard', validateToken, validators.deleteDashParamValidator, controllers.deleteDashboard)

    return route
}

