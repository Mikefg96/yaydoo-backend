const express = require('express')
const controller = require('../controllers/public.controller.js')
const router = express.Router();

router.get('/login', controller.loginUser);
router.get('/register', controller.registerUser)

module.exports = router