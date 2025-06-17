// client/src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          DanceBooking
        </Link>
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <Link to="/classes" className="text-gray-700 hover:text-indigo-600">
                Clases
              </Link>
              <Link to="/my-bookings" className="text-gray-700 hover:text-indigo-600">
                Mis reservas
              </Link>
              {user.role === "instructor" && (
                <Link to="/instructor" className="text-gray-700 hover:text-indigo-600">
                  Panel Instructor
                </Link>
              )}
              {user.role === "admin" && (
                <>
                  <Link to="/admin/users"   className="text-gray-700 hover:text-indigo-600">Usuarios (Admin)</Link>
                  <Link to="/admin/classes" className="text-gray-700 hover:text-indigo-600">Clases (Admin)</Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="text-gray-700 hover:text-indigo-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-indigo-600">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
