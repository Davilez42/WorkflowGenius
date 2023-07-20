const Router = require('express')
const controllers = require('../../controllers/v1')
const {validateToken} = require('../../middlewares/valdiateToken')
const router = Router()

router.get('/get_Dashboard/:id_user', validateToken,controllers.getDashboards)
router.post('/create_Dashboard/name/:name_dashboard',validateToken,controllers.createDashboard)
module.exports = router;