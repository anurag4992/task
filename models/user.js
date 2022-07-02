const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const {itemSchema}= require("./item")

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    item : {
        type: Array,
        default: "Default item"
    }
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);