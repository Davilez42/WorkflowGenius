const Router = require('express')
const {validateUser,registerUser} = require('../../controllers/authController')

const router = Router()

router.post("/validateuser",validateUser)
//router.post('/register_User',registerUser)
module.exports = router
 
 