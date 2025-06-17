const express = require('express');
const router  = express.Router();

const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass
} = require('../controllers/classController');

const { protect, authorize } = require('../middleware/authMiddleware');

// CRUD de clases
router
  .route('/')
  .get(getAllClasses)
  .post(protect, authorize('admin', 'instructor'), createClass);

router
  .route('/:id')
  .get(getClassById)
  .put(protect, authorize('admin', 'instructor'), updateClass)
  .delete(protect, authorize('admin', 'instructor'), deleteClass);

module.exports = router;
