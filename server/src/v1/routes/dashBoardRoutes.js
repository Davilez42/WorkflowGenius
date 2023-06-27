const Router = require('express')
const {getDashboard,newDashboard} = require('../../controllers/dashboardController')
const router = Router()

router.get('/getDashboard/:id_user',getDashboard)
//router.patch('/updateDashboard/user/:id_user/d/:id_dashboard')
router.patch('/newDashboard/user/:id_user',newDashboard)

module.exports = router;