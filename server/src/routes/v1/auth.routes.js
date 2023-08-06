



module.exports = (route, controllers, validators) => {

    route.post("/sign_user", validators.loginParamsValidator, controllers.signUser)
    route.post('/signUp_user', validators.registerParamsValidator, controllers.signUpUser)

    return route
}






