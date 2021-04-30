const model = require('../models')
const jwt = require('jsonwebtoken')
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
                email: req.body.email,
            }
        })
        console.log(user.id)
        const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
        console.log(encryptedId)
        if(user.password === req.body.password) {
            res.json({
                message: 'sign in successful',
                user: user,
                userId: encryptedId
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

userController.authCheck = async (req,res) => {
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        const user = await model.user.findOne({
        where: {
            id: decryptedId.userId
        }
    })
    res.json({user: user.id})
    } catch (error) {
        res.json({message: 'not verified'})
    }
}

module.exports = userController