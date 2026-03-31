const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    guestName: String,
    guestEmail: String,
    roomType: String,
    checkIn: Date,
    checkOut: Date,
    guests: Number,
    creditScore: Number,
    finalPrice: Number,
    bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);