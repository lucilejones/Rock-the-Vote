const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    memberSince: {
        type: Date,
        default: Date.now
    },
    isAmin: {
        type: Boolean,
        default: false
    }
})
// include issues they've voted on in this schema?

module.exports = mongoose.model("User", userSchema)