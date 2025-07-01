const mongoose = rqeuire('mongoose');

const SlotBookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        rqeuired: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['booked', 'available'],
        default: 'available',
        require: false,
    }
});


module.exports - mongoose.model('SlotBooking', SlotBookingSchema);
