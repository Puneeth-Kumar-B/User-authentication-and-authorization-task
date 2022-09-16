const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const register = async(req, res) => {
    try {
        let { mailID } = req.body;
        const userExist = await User.findOne({ mailID: mailID })
        if (userExist) {
            return res.status(200).json({ message: "User details already exists" })
        } else {
            const hashedPass = await bcrypt.hash(req.body.password, 10)
            let user = new User({
                name: req.body.name,
                mobile: req.body.mobile,
                mailID: req.body.mailID,
                password: hashedPass,
                status: req.body.status
            })
            const savedUser = await user.save()
            res.status(200).json({ message: "User registered successfully", data: savedUser })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ errorMessage: error.message || error })
    }
}

const login = async(req, res) => {
    try {
        var emailID = req.body.emailID
        var password = req.body.password
        const user = await User.findOne({ mailID: emailID })

        if (user) {
            const result = await bcrypt.compare(password, user.password)

            if (result) {
                let token = jwt.sign({ name: user.name, mailID: user.mailID }, 'verySecretValue', { expiresIn: '5min' })
                const data = { name: user.name, mailID: user.mailID, token: token }

                res.status(200).json({ message: "Logged-in successfully", data: data })
            } else {
                res.json({ errorMessage: "incorrect Password!!" })
            }
        } else {
            res.json({ errorMessage: "User not found!!" })
        }
    } catch (error) {
        return res.status(400).json({ errorMessage: error.message || error })
    }
}

const getUserDetails = async(req, res) => {
    try {
        const token = await req.header('user-access-token')
        if (!token) return res.status(403).json({ errorMessage: "Access Denied!! No Token Provided" })
        const decoded = await jwt.verify(token, 'verySecretValue')
        req.user = await User.findById(decoded._id)

        return res.header('user-access-token', token).status(200).json({ user: decoded })
    } catch (error) {
        return res.status(400).json({ errorMessage: error.message || error })
    }
}

module.exports = { register, login, getUserDetails }