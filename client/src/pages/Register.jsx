import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', password:'' });
  const [err, setErr] = useState('');

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setErr('');
    try {
      await register(form);
      navigate('/classes');
    } catch {
      setErr('Error al registrarse');
    }
  };

  return (
    <div className="card max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            name="firstName" type="text"
            value={form.firstName} onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Apellido</label>
          <input
            name="lastName" type="text"
            value={form.lastName} onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email" type="email"
            value={form.email} onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Contraseña</label>
          <input
            name="password" type="password"
            value={form.password} onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Registrarse
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
