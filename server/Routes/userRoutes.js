const express = require('express')
const router = express.Router()

const authController = require('../Controllers/authController')

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/logout').post(authController.logout)

module.exports = router
