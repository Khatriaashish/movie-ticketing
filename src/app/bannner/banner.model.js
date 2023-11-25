const mongoose = require('mongoose');

const bannerSchemaDef = new mongoose.Schema({
    title: {
        type: String,
        min: 2,
        require: true
    },
    url: {
        type: String
    },
    image: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const BannerModel = mongoose.model("Banner", bannerSchemaDef)

//exports
module.exports = BannerModel