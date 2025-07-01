const Booking = require('../models/Booking');

// Create a new slot booking
exports.upcomingBooking = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const bookings = await Booking.find({ date: { $gte: today } }).sort({ date: 1, timeSlot: 1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

// Get all slot bookings
exports.bookings = async (req, res) => {
    try {
        const { name, phone, date, timeSlot } = req.body;
        const booking = new Booking({ name, phone, date, timeSlot });
        await booking.save();
        res.status(201).json({ message: 'Booking successful', booking });
    } catch (err) {
        res.status(500).json({ error: 'Failed to book slot' });
    }
};