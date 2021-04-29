const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')

userRouter.post('/', userController.create)

module.exports = userRouter