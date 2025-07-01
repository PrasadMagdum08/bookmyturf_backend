const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    }
});

module.exports = mongoose.model('User', UserSchema);
