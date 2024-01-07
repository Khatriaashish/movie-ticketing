const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 1,
        trim: true,
        required: true
    },
    image: String,
    language: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true,
    },
    cast: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        hours: {
            type: Number,
            required: true
        },
        minutes: {
            type: Number,
            required: true
        },
        seconds: {
            type: Number,
            required: true
        }
    },
    releaseDate: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
})

const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel;