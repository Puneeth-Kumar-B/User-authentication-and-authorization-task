const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: { type: String },

    mobile: { type: String },

    mailID: {
        type: String,
        unique: true
    },

    password: { type: String },

    status: {
        type: Boolean,
        default: true
    }
}, { timestamp: true })


const User = mongoose.model('User', userSchema)

module.exports = User;
