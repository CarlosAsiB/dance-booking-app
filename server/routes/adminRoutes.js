// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Usuarios
router.get('/users', protect, authorize('admin'), adminController.getAllUsers);
router.put('/users/:id/role', protect, authorize('admin'), adminController.updateUserRole);
router.delete('/users/:id', protect, authorize('admin'), adminController.deleteUser);
router.post('/users', protect, authorize('admin'), adminController.createUser);

// Clases
router.get('/classes', protect, authorize('admin'), adminController.getAllClasses);
router.delete('/classes/:id', protect, authorize('admin'), adminController.deleteClass);
router.post('/classes', protect, authorize('admin'), adminController.createClass);

// Manejo de inscripciones a clases
router.get('/classes/:id/bookings', protect, authorize('admin'), adminController.getClassBookings);
router.post('/classes/:id/bookings', protect, authorize('admin'), adminController.addUserToClass);
router.delete('/classes/:id/bookings/:bookingId', protect, authorize('admin'), adminController.removeUserFromClass);


module.exports = router;
