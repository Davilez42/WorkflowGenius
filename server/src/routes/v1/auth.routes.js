const Router = require('express')
const controller = require('../../controllers/v1')
const validators = require('../../middlewares/paramsValidators.js/')
const router = Router()

router.post("/validate_user",validators.loginParamsValidator,controller.loginUser)
router.post('/register_User',validators.registerParamsValidator,controller.registerUser)
module.exports = router
 
 