const imageRoutes = require('express').Router()
const imageController = require('../controllers/imageController')

imageRoutes.post('/', imageController.create)
imageRoutes.delete('/:title', imageController.destroy)
imageRoutes.get('/', imageController.allFavs)

module.exports = imageRoutes