const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Use a static OTP for all users (for development/demo)
const STATIC_OTP = '123456';

exports.register = async (req, res) => {
    const { phone, role } = req.body;
    if (!phone || !role) return res.status(400).json({ message: 'Phone and role are required.' });
    try {
        let user = await User.findOne({ phone });
        if (user) return res.status(400).json({ message: 'User already exists.' });
        const otp = STATIC_OTP;
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
        user = new User({ phone, role, otp, otpExpires });
        await user.save();
        res.status(201).json({ message: `User registered. Use OTP: ${STATIC_OTP}` });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone is required.' });
    try {
        const user = await User.findOne({ phone });
        if (!user) return res.status(404).json({ message: 'User not found.' });
        user.otp = STATIC_OTP;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
        res.json({ message: `OTP for login: ${STATIC_OTP}` });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: 'Phone and OTP are required.' });
    try {
        const user = await User.findOne({ phone });
        if (!user) return res.status(404).json({ message: 'User not found.' });
        if (user.otp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}; 