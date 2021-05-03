const imageRoutes = require('express').Router()
const imageController = require('../controllers/imageController')

imageRoutes.post('/', imageController.create)
imageRoutes.delete('/:title', imageController.destroy)

module.exports = imageRoutes