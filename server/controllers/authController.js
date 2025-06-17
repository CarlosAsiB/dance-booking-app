
// authController.js
const User = require('../models/User');
const jwt  = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Si ya existe un usuario logueado y su rol no es admin, forzamos role="user"
    let userRole = 'user';
    if (req.user && req.user.role === 'admin' && role) {
      // solo un admin puede asignar roles distintos
      userRole = role;
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: userRole
    });

    // Generar JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // Verifica usuario y contraseña (usando bcrypt si guardaste hasheado)
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

