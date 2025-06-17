import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../contexts/authContext";

export default function Classes() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    API.get("/classes").then(r => setClasses(r.data.data));
  }, []);

  const inscribir = async id => {
    try {
      await API.post("/bookings", { classId: id });
      setMsg("¡Inscripción exitosa!");
    } catch (e) {
      setMsg(e.response?.data?.error || "Error al inscribirse");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Clases Disponibles</h2>
      {msg && <div className="mb-4 text-red-600">{msg}</div>}
      <ul className="space-y-4">
        {classes.map(c => (
          <li key={c._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="text-sm text-gray-600">
                Instructor: {c.instructor?.firstName} {c.instructor?.lastName}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setSelected(c)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Ver detalles
              </button>
              <button
                onClick={() => inscribir(c._id)}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Inscribirse
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-2">{selected.title}</h3>
            <p className="mb-1"><b>Descripción:</b> {selected.description}</p>
            <p className="mb-1"><b>Nivel:</b> {selected.level}</p>
            <p className="mb-1"><b>Cupo:</b> {selected.capacity}</p>
            <p className="mb-4 text-sm text-gray-600">
              {new Date(selected.startTime).toLocaleString()} – {new Date(selected.endTime).toLocaleString()}
            </p>
            <button onClick={() => setSelected(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
