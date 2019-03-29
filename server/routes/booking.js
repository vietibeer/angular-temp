const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const UserController = require('../controllers/user');
const BookingController = require('../controllers/booking');

router.post('', UserController.authMiddleware, BookingController.createBooking);

module.exports = router;