const Class = require('../models/class');
const Booking = require('../models/booking');

// Crear una clase
exports.createClass = async (req, res, next) => {
  try {
    const { title, description, level, capacity, startTime, endTime } = req.body;
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      return res.status(400).json({ error: 'La fecha de finalización debe ser posterior a la de inicio' });
    }

    const newClass = await Class.create({
      title,
      description,
      level,
      capacity,
      instructor: req.user.id,
      startTime: start,
      endTime: end
    });

    res.status(201).json(newClass);
  } catch (err) {
    next(err);
  }
};

// Listar clases 
exports.getAllClasses = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user && req.query.mine === "true" && req.user.role === "instructor") {
      filter.instructor = req.user._id;
    }
    const classes = await Class.find(filter)
      .populate({
        path: "bookings",
        populate: { path: "user", select: "firstName lastName email" }
      })
      .populate("instructor", "firstName lastName");
    res.json({ data: classes });
  } catch (err) {
    next(err);
  }
};

// Obtener clase por ID
exports.getClassById = async (req, res, next) => {
  try {
    const clase = await Class.findById(req.params.id)
      .populate("instructor", "firstName lastName");
    if (!clase) return res.status(404).json({ error: "Clase no encontrada" });
    res.json(clase);
  } catch (err) {
    next(err);
  }
};

// Actualizar clase 
exports.updateClass = async (req, res, next) => {
  try {
    const clase = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!clase) return res.status(404).json({ error: "Clase no encontrada" });
    res.json(clase);
  } catch (err) {
    next(err);
  }
};

// Borrar clase y sus inscripciones
exports.deleteClass = async (req, res, next) => {
  try {
    // 1) Borra la clase
    const clase = await Class.findByIdAndDelete(req.params.id);
    if (!clase) return res.status(404).json({ error: "Clase no encontrada" });

    // 2) Borra todas las inscripciones 
    const result = await Booking.deleteMany({ class: clase._id });
    console.log(`🗑️ Se eliminaron ${result.deletedCount} inscripciones de la clase ${clase._id}`);

    // 3) Responde
    res.json({ message: "Clase e inscripciones eliminadas" });
  } catch (err) {
    next(err);
  }
};