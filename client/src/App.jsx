import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/authContext';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';
import Classes from './pages/Classes';
import MyBookings from './pages/MyBookings';
import InstructorRoute from './routes/InstructorRoute';
import AdminRoute      from './routes/AdminRoute';
import PrivateRoute    from './routes/PrivateRoute';
import InstructorDashboard from './pages/Instructor/Dashboard';
import UsersPanel      from './pages/Admin/UsersPanel';
import ClassesPanel    from './pages/Admin/ClassesPanel';

function HomeRedirect() {
  const { user } = useAuth();
  return user
    ? <Navigate to="/classes" replace />
    : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/classes"   element={<PrivateRoute><Classes /></PrivateRoute>} />
          <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
          <Route path="/instructor" element={<InstructorRoute><InstructorDashboard/></InstructorRoute>} />
          <Route path="/admin/users"  element={<AdminRoute><UsersPanel/></AdminRoute>} />
          <Route path="/admin/classes" element={<AdminRoute><ClassesPanel/></AdminRoute>} />
          <Route path="*" element={<Navigate to="/classes" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
