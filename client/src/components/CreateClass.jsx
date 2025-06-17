// client/src/components/CreateClass.jsx
import React, { useState } from "react";
import API from "../../api";

export default function CreateClass({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "basic",
    capacity: 10,
    startTime: "",
    endTime: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      await API.post("/classes", form);
      setMsg("Clase creada con éxito");
      setForm({
        title: "",
        description: "",
        level: "basic",
        capacity: 10,
        startTime: "",
        endTime: ""
      });
      onCreated && onCreated();
    } catch {
      setMsg("Error al crear clase");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Crear nueva clase</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="basic">Principiante</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>
        <input
          name="capacity"
          type="number"
          min="1"
          placeholder="Cupo máximo"
          value={form.capacity}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <label className="block">
          <span className="text-sm">Inicio</span>
          <input
            name="startTime"
            type="datetime-local"
            value={form.startTime}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm">Fin</span>
          <input
            name="endTime"
            type="datetime-local"
            value={form.endTime}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Crear clase
        </button>
      </form>
      {msg && <p className="mt-2 text-sm text-red-600">{msg}</p>}
    </div>
  );
}
