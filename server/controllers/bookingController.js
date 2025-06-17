const Booking = require('../models/booking');
const Class = require('../models/class');

exports.bookClass = async (req, res, next) => {
  try {
    // Chequea si ya está inscripto
    const exists = await Booking.findOne({ user: req.user._id, class: req.body.classId });
    if (exists) return res.status(400).json({ error: 'Ya estás inscripto en esta clase' });

    // Chequea cupo
    const clase = await Class.findById(req.body.classId);
    const inscriptos = await Booking.countDocuments({ class: req.body.classId });
    if (inscriptos >= clase.capacity) {
      return res.status(400).json({ error: 'La clase está llena' });
    }

    // Crea la reserva
    const booking = await Booking.create({
      user: req.user._id,
      class: req.body.classId
    });

    
    await Class.findByIdAndUpdate(
      req.body.classId,
      { $push: { bookings: booking._id } }
    );

    res.status(201).json({ data: booking });
  } catch (err) { next(err); }
};

exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('class');
    res.json({ data: bookings });
  } catch (err) { next(err); }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    // 1. Buscar el booking a eliminar
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Reserva no encontrada' });

    // 2. Eliminar el booking
    await Booking.findByIdAndDelete(req.params.id);

    // 3. Eliminar del array bookings en la clase asociada
    await Class.findByIdAndUpdate(
      booking.class,
      { $pull: { bookings: booking._id } }
    );

    res.json({ message: 'Baja realizada' });
  } catch (err) { next(err); }
};
