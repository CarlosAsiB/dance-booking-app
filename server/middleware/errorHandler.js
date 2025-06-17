// server/middleware/errorHandler.js

// Middleware de captura de errores
function errorHandler (err, req, res, next) {
  console.error(err.stack);

  // Si ya enviaste respuesta, delega al next error handler de Express
  if (res.headersSent) return next(err);

  // Estado por defecto y mensaje genérico
  const status = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({
    success: false,
    error: message
  });
}

module.exports = errorHandler;
