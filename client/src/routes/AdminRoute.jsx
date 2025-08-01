import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from   '../contexts/AuthContext';

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  // Si no está logueado, redirige a login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si no es admin, redirige a la página principal
  if (user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Si es admin, renderiza el componente protegido
  return <>{children}</>;
}
