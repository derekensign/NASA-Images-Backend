const model = require('../models')
const jwt = require('jsonwebtoken')
const userController = {}

userController.create = async(req,res) => {
    try {
        let user = await model.user.create({
            name: req.body.namne,
            email: req.body.email,
            password: req.body.password
        })
        const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
        res.json({
            message:'user created',
            user: user,
            userId: encryptedId,
        })
    } catch (error) {
        res.json({
            error
        })
    }
}

module.exports = userController