const Router = require('express')
const {getDashboard,newDashboard} = require('../../controllers/dashboardController')
const {validateToken} = require('../../middlewares/valdiateToken')
const router = Router()

router.get('/getDashboard/:id_user',getDashboard)
//router.patch('/updateDashboard/user/:id_user/d/:id_dashboard')
router.post('/newDashboard/user/:id_user/name/:name_dashboard',validateToken,newDashboard)

module.exports = router;