const express = require('express')
const authRoutes = require('./auth.routes')
const dashBoardRoutes = require('./dashboard.routes')
const router =  express.Router()

router.get('/',(req,res)=>{return res.json({"message":"Welcome To 📕 WorkflowGenius  routes v1 !"})})

router.use('/user',authRoutes)
router.use('/dashboard',dashBoardRoutes)

module.exports = router