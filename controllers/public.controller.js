const User = require('../models/User.model')

exports.registerUser = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const isSeller = req.body.isSeller

    const newUser = new User({
        email,
        password,
        accessType: isSeller ? 'seller' : 'buyer'
    });
    
    newUser.save((err, savedUser) => {
        if(err) {
            res.status(500).json({ success: false, msg: err }) 
        } else {
            res.status(200).json({
                success: true,
                data: savedUser
            })
        }
    })
}

exports.loginUser = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.find({ email }, (err, user) => {
        if(err) res.status(500).json({ success: false, msg: err })

        if(user.password === password) {
            res.status(200).json({
                success: true,
                data: user
            })
        } else {
            res.status(403).json({
                success: false,
                msg: 'Credentials do not match. Please, verify your input.'
            })
        }
    })
}