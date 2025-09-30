const express = require('express');
const { createBooking, getBookings,getBookingStatus,clearAllBookings,cancelBooking} = require('../controllers/bookingController');
const router = express.Router();

// Create booking
router.post('/', createBooking);

// Get all bookings (extra for testing)
router.get('/', getBookings);

router.get('/clear', clearAllBookings);

router.post('/cancel/:bookingId',cancelBooking);

router.get('/:bookingId', getBookingStatus);



module.exports = router;




