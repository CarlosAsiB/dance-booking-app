// src/routes/InstructorRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from  '../contexts/AuthContext';

export default function InstructorRoute({ children }) {
  const { user } = useAuth();

  // Si no está logueado, redirige a login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si no es instructor, redirige al home
  if (user.role !== 'instructor') {
    return <Navigate to="/" />;
  }

  // Si es instructor, renderiza el componente protegido
  return <>{children}</>;
}
