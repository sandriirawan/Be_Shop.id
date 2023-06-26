const express = require('express')
const router = express.Router()
const userController = require('../controller/users')
const {protect, admin} = require('../middlewares/auth') 


router
.get('/',protect,admin,userController.user)
.post('/register', userController.register)
.post('/login',userController.login)
.post('/refreshToken',userController.refreshToken)
.get('/profile',protect,userController.profile)


module.exports = router