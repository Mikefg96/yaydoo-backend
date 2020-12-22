const User = require('../models/User.model')
const Product = require('../models/Product.model')

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
            const dummyProduct = new Product({
                name: 'Producto de Prueba',
                sku: 'TEST-101-OP10',
                qty: 1,
                price: 245,
                seller_id: savedUser._id
            })

            dummyProduct.save((err, savedProduct) => {
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
    })
}

exports.loginUser = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.find({ email }, (err, user) => {
        if(err) {
            res.status(500).json({ 
                success: false, 
                msg: err 
            })
        } 

        if(user[0] && (user[0].password == password)) {
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

exports.getAllProducts = (req, res) => {
    const nameKeyword = req.query.keyword 
    ? 
    {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const skuKeyword = req.query.keyword 
    ? 
    {
        sku: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    Product.find({ $or: [ { ...nameKeyword }, { ...skuKeyword } ] }).populate('seller_id').exec((err, products) => {
        if(err) {
            res.status(500).json({
                sucess: false,
                msg: err
            })
        } else {
            res.status(200).json({
                sucess: true,
                data: products
            })
        }
    })
}

exports.getProductsByUser = (req, res) => {
    const userId = req.params.userId

    Product.find({ seller_id: userId }, (err, products) => {
        if(err) {
            res.status(500).json({ 
                success: false, 
                msg: err 
            })
        } else {
            res.status(200).json({
                success: true,
                data: products
            })
        }
    })
}

exports.registerProduct = (req, res) => {
    const userId = req.body.userId
    const name = req.body.name
    const sku = req.body.sku
    const qty = req.body.qty
    const price = req.body.price

    const newProduct = new Product({
        name,
        sku,
        qty,
        price,
        seller_id: userId
    })
    
    newProduct.save((err, savedProduct) => {
        if(err) {
            res.status(500).json({
                sucess: false,
                msg: err
            })
        } else {
            res.status(201).json({
                sucess: true,
                data: savedProduct
            })
        }
    })
}

exports.getAllSellers = (req, res) => {

    User.find({ accessType: 'seller' }).distinct('email', (err, sellers) => {
        if(err) {
            res.status(500).json({
                sucess: false,
                msg: err
            })
        } else {
            res.status(200).json({
                sucess: true,
                data: sellers
            })
        }
    })
}

exports.getProductsBySeller = async(req, res) => {
    const sellerEmail = req.query.sellerEmail ?  { email: req.query.sellerEmail } : {}

    const sellerId = await User.find({ ...sellerEmail }).select('_id')

    Product.find({ seller_id: sellerId[0]._id }, (err, products) => {
        if(err) {
            res.status(500).json({
                sucess: false,
                msg: err
            })
        } else {
            res.status(200).json({
                sucess: true,
                data: products
            })
        }
    })
}