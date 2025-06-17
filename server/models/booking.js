const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  createdAt: { type: Date, default: Date.now }
});


// Índice para que un usuario no reserve dos veces la misma clase
bookingSchema.index({ user: 1, class: 1 }, { unique: true });


module.exports = mongoose.model('Booking', bookingSchema);
