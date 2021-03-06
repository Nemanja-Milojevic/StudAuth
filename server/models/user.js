const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    surname: String,
    index: String,
    class_id: String
})

module.exports = mongoose.model('user', userSchema, 'students')