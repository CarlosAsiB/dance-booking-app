const express = require('express');
const router  = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const {
  bookClass,
  getUserBookings,
  cancelBooking
} = require('../controllers/bookingController');


router.post('/', protect, bookingController.bookClass);        // Inscribirse
router.get('/user', protect, bookingController.getUserBookings); // Mis inscripciones
router.delete('/:id', protect, bookingController.cancelBooking); // Darse de baja

module.exports = router;
