const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')

userRouter.post('/', userController.create)
userRouter.post('/login', userController.login)
userRouter.get('/getInfo', userController.getInfo)
userRouter.get('/authcheck', userController.authCheck)

module.exports = userRouter