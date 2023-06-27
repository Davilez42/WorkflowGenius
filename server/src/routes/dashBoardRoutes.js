const Router = require('express')
const {getDashboard,changedStateTask,insertTask} = require('../controllers/dashboardController')
const router = Router()

router.get('/getDashboard/:id_user',getDashboard)

module.exports = router;