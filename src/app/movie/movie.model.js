const mongoose = require('mongoose');

const movieSchemaDef = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    director: {
        type: String,
        require: true
    },
    cast: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    // releaseDate: {
    //     type: Date,
    //     required: true
    // },
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
    autoCreate: true,
    autoIndex: true
})

const MovieModel = mongoose.model('Movie', movieSchemaDef);

module.exports = MovieModel