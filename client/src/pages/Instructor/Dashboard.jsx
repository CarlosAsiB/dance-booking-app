import React, { useEffect, useState } from "react";
import API from "../../api";
import { useAuth } from "../../contexts/AuthContext";

export default function InstructorDashboard() {
  const { logout } = useAuth();
  const [myClasses, setMyClasses] = useState([]);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "basic",
    capacity: 10,
    startTime: "",
    endTime: ""
  });

  const fetchClasses = () => {
    API.get("/classes?mine=true")
      .then(r => setMyClasses(r.data.data))
      .catch(() => setMyClasses([]));
  };
  useEffect(() => { fetchClasses(); }, [msg]);

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
      fetchClasses();
    } catch (err) {
      setMsg(err.response?.data?.error || "Error al crear clase");
    }
  };

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Panel Instructor</h2>
        <button
          onClick={logout}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Formulario de creación en grid igual que ClassesPanel */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Crear clase</h3>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <input
            name="capacity"
            type="number"
            min="1"
            placeholder="Cupo máximo"
            value={form.capacity}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 col-span-full"
          />
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="basic">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
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
            className="col-span-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Crear clase
          </button>
        </form>
        {msg && <p className="mt-2 text-sm text-green-600">{msg}</p>}
      </div>

      {/* Listado de mis clases */}
      <ul className="space-y-4">
        {myClasses.map(cls => (
          <li key={cls._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold">{cls.title}</h4>
                <p className="text-sm text-gray-600">
                  {new Date(cls.startTime).toLocaleString()} –{" "}
                  {new Date(cls.endTime).toLocaleString()}
                </p>
                <p className="text-gray-700">{cls.description}</p>
                <p className="text-sm">
                  Nivel: {cls.level} | Cupo: {cls.capacity}
                </p>
              </div>
            </div>
            <details className="mt-3">
              <summary className="cursor-pointer text-indigo-600">
                Ver inscriptos
              </summary>
              <ul className="mt-2 space-y-1">
                {cls.bookings?.length ? (
                  cls.bookings.map(bk => (
                    <li key={bk._id} className="text-sm flex justify-between">
                      <span>
                        {bk.user?.firstName} {bk.user?.lastName} (
                        {bk.user?.email})
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No hay inscriptos</li>
                )}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
