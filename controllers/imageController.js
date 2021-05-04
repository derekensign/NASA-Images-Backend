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

    const [newFavImage, found] = await models.image.findOrCreate({ where: 
        {
            title: req.body.title,  
        }, defaults:
        {
        imageurl: req.body.imageurl,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        copyright: req.body.copyright
        }
    })


    await user.addImage(newFavImage)

    res.json({ newFavImage })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

imageController.destroy = async (req, res) => {
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