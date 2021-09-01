// 3rd-party modules
const express = require('express')
// custom modules
const authController = require('../controllers/authController')

const router = express.Router()
// baseUrl ===> /auth

router.post('/signup', authController.signup_post)


module.exports = router