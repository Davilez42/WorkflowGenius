const Router = require('express')
const {getDashboard,changedStateTask,insertTask} = require('../controllers/dashboardController')
const router = Router()

router.get('/getDashboard/:id_user',getDashboard)
router.post('/insertTask/:id_user/:sesion',insertTask)
router.post('/changedStateTask/:id_user/:id_task/:sesion',changedStateTask)

module.exports = router;