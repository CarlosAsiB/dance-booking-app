const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true, validate: { validator: function(v) { return v > this.startTime; }, message: 'endTime must be after startTime' } },
  level: { type: String, enum: ['basic','intermediate','advanced'], default: 'basic' },
  capacity: { type: Number, default: 20, min: 1 },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

classSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'class'
});

classSchema.pre('remove', async function(next) {
  const Booking = require('./booking');
  await Booking.deleteMany({ class: this._id });
  next();
});

module.exports = mongoose.model('Class', classSchema);
