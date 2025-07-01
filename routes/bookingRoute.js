const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new slot booking
router.get('/bookings/upcoming', bookingController.upcomingBooking);

// Get all slot bookings
router.post('/booking', bookingController.bookings);

module.exports = router;
