const User = require('../models/User');
const Class = require('../models/class');
const Booking = require('../models/booking');

// Listar usuarios
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ data: users });
};

// Crear usuario
exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ data: user });
};

// Actualizar rol de usuario
exports.updateUserRole = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
  res.json({ data: user });
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Usuario eliminado' });
};

// Listar todas las clases con inscriptos 
exports.getAllClasses = async (req, res) => {
  const clases = await Class.find()
    .populate({
      path: 'bookings',
      populate: { path: 'user', select: 'firstName lastName email' }
    })
    .populate('instructor', 'firstName lastName');
  res.json({ data: clases });
};

// Crear clase como admin 
exports.createClass = async (req, res) => {
  let instructorId = req.body.instructor; // puede ser un ID o email
  // Si envía un email, buscar el ID
  if (instructorId && instructorId.includes('@')) {
    const user = await User.findOne({ email: instructorId, role: "instructor" });
    if (!user) return res.status(400).json({ error: "Instructor no encontrado" });
    instructorId = user._id;
  }
  const clase = await Class.create({ ...req.body, instructor: instructorId });
  res.status(201).json({ data: clase });
};

// Eliminar clase y todas las inscripciones asociadas
exports.deleteClass = async (req, res, next) => {
  try {
    // 1) Borra la clase
    const clase = await Class.findByIdAndDelete(req.params.id);
    if (!clase) return res.status(404).json({ error: "Clase no encontrada" });

    // 2) Borra todas las inscripciones asociadas
    const result = await Booking.deleteMany({ class: clase._id });
    console.log(`🗑️ Admin eliminó ${result.deletedCount} inscripciones de la clase ${clase._id}`);

    // 3) Responde
    res.json({ message: "Clase e inscripciones eliminadas" });
  } catch (err) {
    next(err);
  }
};

// Obtener inscriptos en una clase
exports.getClassBookings = async (req, res) => {
  const clase = await Class.findById(req.params.id)
    .populate({
      path: 'bookings',
      populate: { path: 'user', select: 'firstName lastName email' }
    });
  if (!clase) return res.status(404).json({ error: "Clase no encontrada" });
  res.json({ data: clase.bookings });
};

// Agregar usuario a una clase por email
exports.addUserToClass = async (req, res) => {
  const { email } = req.body;
  const classId = req.params.id;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  const clase = await Class.findById(classId);
  if (!clase) return res.status(404).json({ error: "Clase no encontrada" });

  const exists = await Booking.findOne({ user: user._id, class: classId });
  if (exists) return res.status(400).json({ error: "El usuario ya está inscripto en esta clase" });

  const inscriptos = await Booking.countDocuments({ class: classId });
  if (inscriptos >= clase.capacity) return res.status(400).json({ error: "La clase está llena" });

  const booking = await Booking.create({
    user: user._id,
    class: classId,
  });

  res.status(201).json({ data: booking });
};

// Dar de baja a usuario de clase (por bookingId)
exports.removeUserFromClass = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.bookingId);
  res.json({ message: 'Usuario dado de baja' });
};
