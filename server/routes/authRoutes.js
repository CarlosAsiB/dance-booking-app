// server/routes/authRoutes.js
const express = require('express');
const router  = express.Router();
const { register, login } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login',    login);

// Ejemplo de ruta protegida y solo para admins:
router.post(
  '/register-instructor',
  protect,
  authorize('admin'),
  register
);

module.exports = router;
