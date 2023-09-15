



module.exports = (route, controllers, validators) => {

    route.post("/sign_user", validators.loginParamsValidator, controllers.signUser)
    route.post('/signup_user', validators.registerParamsValidator, controllers.signUpUser)

    return route
}






