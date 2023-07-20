const Router = require('express')
const controllers = require('../../controllers/v1')
const validators = require('../../middlewares/paramsValidators.js/')
const {validateToken} = require('../../middlewares/valdiateToken')
const router = Router()

router.get('/get_dashboard', validateToken,controllers.getDashboards)
router.put('/create_dashboard',validateToken,validators.createDashParamValidator,controllers.createDashboard)
module.exports = router;