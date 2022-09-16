const Joi = require('joi')

const validData = Joi.object({
    name: Joi.string().required().min(3),
    mobile: Joi.number().required().min(1000000000).max(9999999999),
    mailID: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$')).required(),
    status: Joi.boolean().default(true)
})

const userSignUp = async(req, res, next) => {
    try {
        await validData.validateAsync({...req.body }, { abortEarly: false })
        next()
    } catch (err) {
        err.status = res.status(400).json({ status: 400, message: err.message || err })
    }
}


const loginData = Joi.object({
    emailID: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$')).required()
})

const userLogin = async(req, res, next) => {
    try {
        await loginData.validateAsync({...req.body }, { abortEarly: false })
        next()
    } catch (err) {
        err.status = res.status(400).json({ status: 400, message: err.message || err })
    }
}


module.exports = { userSignUp, userLogin }