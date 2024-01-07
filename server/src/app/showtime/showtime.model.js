const mongoose = require('mongoose');

const ShowtimeSchema = new mongoose.Schema({
    showtime: {
        type: String,
        min: 1,
        trim: true,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    movieId: {
        type: mongoose.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    theatreId: {
        type: mongoose.Types.ObjectId,
        ref: 'Theatre',
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
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

const ShowtimeModel = mongoose.model('Showtime', ShowtimeSchema);

module.exports = ShowtimeModel;