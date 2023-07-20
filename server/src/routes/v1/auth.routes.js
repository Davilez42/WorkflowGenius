const Router = require('express')
const controller = require('../../controllers/v1')
const validators = require('../../middlewares/paramsValidators.js/')
const router = Router()

router.post("/sign_user",validators.loginParamsValidator,controller.signUser)
router.post('/signUp_user',validators.registerParamsValidator,controller.signUpUser)
module.exports = router
 
 