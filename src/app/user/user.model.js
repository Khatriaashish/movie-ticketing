const mongoose = require('mongoose');

const userSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        require: true,
        unique:true
    },
    role: {
        type: String,
        enum: ['admin', 'boxoffice', 'customer'],
        default: "customer"
    },
    token: String,
    image: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    mobileNo: {
        type: String,
        default: null,
        min: 10,
        max: 10
    },
    password: {
        type: String,
        default: null
    },
    resetToken: String,
    resetExpiry: String
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const UserModel = mongoose.model("User", userSchemaDef)

//exports
module.exports = UserModel