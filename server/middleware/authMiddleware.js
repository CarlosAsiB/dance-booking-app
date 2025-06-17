// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protege rutas: solo si hay un token válido
exports.protect = async (req, res, next) => {
    console.log("PROTECT: Intento acceso a ruta protegida", req.method, req.originalUrl); // <-- AGREGÁ ESTO

  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// Autoriza por rol: recibe una lista de roles permitidos
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `El rol "${req.user.role}" no tiene permiso` });
    }
    next();
  };
};
