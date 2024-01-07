const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    showtimeId: {
        type: mongoose.Types.ObjectId,
        ref: 'Showtime',
        trim: true
    },
    seats: {
        type: [mongoose.Types.Mixed],
        required: true
    },
    selectedSeats: [{
        type: String,
        required: true
    }],
    ticketPrice: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
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
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['booked', 'checked'],
        default: null
    }
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
})

const ReservationModel = mongoose.model('Reservation', ReservationSchema);

module.exports = ReservationModel;