const express = require('express')
const controller = require('../controllers/public.controller.js')
const router = express.Router();

router.post('/login', controller.loginUser);
router.post('/register', controller.registerUser);

router.get('/products/:userId', controller.getProductsByUser)

module.exports = router