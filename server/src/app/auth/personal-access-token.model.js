const mongoose = require('mongoose');

const patSchemaDef = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true
    },
    token: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const PATModel = mongoose.model("Pat", patSchemaDef);

module.exports = PATModel;