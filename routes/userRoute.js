const { userSignUp, userLogin } = require('../validations/valid')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.post('/register', userSignUp, controller.register)
router.post('/login', userLogin, controller.login)
router.get('/getUserDetails', controller.getUserDetails)

module.exports = router
