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

// Get turf details
exports.turfDetails = (req, res) => {
    const turfs = {
        bhima: {
            name: "Bhima Sports Arena",
            img: "displayimgs/displayimg1.jpg",
            address: "Rajarshi Shahu Jalataran Talav, Rajarampuri, Kolhapur",
            activities: "Football, Cricket, Yoga",
            hours: "06:00 AM – 11:30 PM",
            rating: "⭐ 4.4 (26 reviews)"
        },
        sportingo: {
            name: "Sportingo Turf",
            img: "displayimgs/displayimg2.jpg",
            address: "Nagalapark, Kolhapur",
            activities: "Football, General Sports",
            hours: "Flexible",
            rating: "⭐ 4.6 (60 reviews)"
        },
        tikitaka: {
            name: "Tiki Taka Turf",
            img: "displayimgs/displayimg3.jpg",
            address: "Race Course Naka, Padmala, Kolhapur",
            activities: "Football",
            hours: "Phone: +91 91531 91535",
            rating: "⭐ 4.3 (92 reviews)"
        },
        kings: {
            name: "Kings Arena",
            img: "displayimgs/displayimg4.jpg",
            address: "Near Shivaji University, Kolhapur",
            activities: "Football, Box Cricket",
            hours: "06:00 AM – 10:00 PM",
            rating: "⭐ 4.5 (40 reviews)"
        },
        kolhapur: {
            name: "Turf Kolhapur",
            img: "displayimgs/displayimg5.jpg",
            address: "Rajarampuri 5th Lane, Kolhapur",
            activities: "Football, Cricket",
            hours: "05:00 AM – 11:00 PM",
            rating: "⭐ 4.2 (30 reviews)"
        }
    };
    const turfId = req.query.turf;
    if (turfs[turfId]) {
        res.json(turfs[turfId]);
    } else {
        res.status(404).json({ error: 'Turf not found' });
    }
};