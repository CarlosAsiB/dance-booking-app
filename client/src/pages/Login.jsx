// client/src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [creds, setCreds] = useState({ email:'', password:'' });
  const [err, setErr] = useState('');

  const handleChange = e =>
    setCreds(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setErr('');
    try {
      await login(creds.email, creds.password);
      navigate('/classes');
    } catch {
      setErr('Credenciales inválidas');
    }
  };

  return (
    <div className="card max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email" type="email"
            value={creds.email} onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Contraseña</label>
          <input
            name="password" type="password"
            value={creds.password} onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Entrar
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        ¿No tienes cuenta?&nbsp;
        <Link to="/register" className="text-indigo-600 hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
