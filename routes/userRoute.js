const Validate = require('../validations/valid')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.post('/register', Validate.userSignUp, controller.register)
router.post('/login', Validate.userLogin, controller.login)
router.get('/getUserDetails', controller.getUserDetails)

module.exports = router