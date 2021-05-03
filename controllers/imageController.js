const models = require ('../models')
const user = require('../models/user')
const imageController = {}

imageController.create = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: { id: req.headers.authorization }
        })
    if (user === null) {
        req.status(404).json({ message: 'user could not be found'})
        return
    }

    const newFavImage = await models.image.findOrCreate({
        title: req.body.title,
        imageUrl: req.body.url,
        description: req.body.description
    })

    await user.addImages(newFavImage)

    res.json({ newFavImage })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

imageController.destory = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        const deleteFavorite = await models.userFavorite.destroy({
            where: {
                title: req.params.title,
                userId: user.id
            }
        })

        res.json({ deleteFavorite })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = imageController