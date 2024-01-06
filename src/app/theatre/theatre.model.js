const mongoose = require('mongoose');
const { Schema } = require('zod');

const TheatreSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 1,
        trim: true,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    seats: {
        type: [mongoose.Types.Mixed],
        required: true,
    },
    seatsAvailable: {
        type: Number,
        required: true,
    },
    image: String,
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

const TheatreModel = mongoose.model('Theatre', TheatreSchema);

module.exports = TheatreModel;