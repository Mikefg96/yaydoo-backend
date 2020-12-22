const express = require('express')
const controller = require('../controllers/public.controller.js')
const router = express.Router();

router.post('/login', controller.loginUser);
router.post('/register', controller.registerUser);

router.get('/products', controller.getAllProducts)
router.get('/products/:userId', controller.getProductsByUser)
router.post('/register/product', controller.registerProduct)

router.get('/sellers', controller.getAllSellers)
router.get('/seller/product', controller.getProductsBySeller)

module.exports = router