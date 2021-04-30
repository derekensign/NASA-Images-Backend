const model = require('../models')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const userController = {}

userController.create = async(req,res) => {
    try {
        let user = await model.user.create({
            name: req.body.name,
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

userController.login = async (req,res) => {
    try {
        let user = await model.user.findOne({
            where: {
                email: req.body.email
            }
        })
        const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
        if(user.password === req.body.password) {
            res.json({
                user,
                encryptedId
                
            })
        } else {
            res.status(401)
            res.json({error: 'incorrect password'})
        }
    } catch (error) {
        res.status(400)
        res.json({ error: 'login failed'})
    }
}


userController.getInfo = async (req, res) => {
    try{
        const ecryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        const user = await model.user.findOne({
            where: {
                id: decryptedId.userId
            }
        })
        res.json({
            user:user
        })
    } catch (error) {
        res.json({
            error
        })
        console.log('decryption failed')
    }
    console.log('decryption succeeded')
}

module.exports = userController