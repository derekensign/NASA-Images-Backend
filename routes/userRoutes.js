const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')

userRouter.post('/', userController.create)
userRouter.get('/getInfo', userController.getInfo)

module.exports = userRouter