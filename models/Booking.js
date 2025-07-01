const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    phone: String,
    date: String,      
    timeSlot: String,  
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Booking', bookingSchema);