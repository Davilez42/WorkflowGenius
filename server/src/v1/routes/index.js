const express = require('express')
const authRoutes = require('./authRoutes')
const dashBoardRoutes = require('./dashBoardRoutes')
const router =  express.Router()

router.get('/',(req,res)=>{return res.json({"message":"Welcome To routes v1 !"})})
router.use(authRoutes)
router.use(dashBoardRoutes)

module.exports = router