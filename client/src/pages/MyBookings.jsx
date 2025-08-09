import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function MyBookings() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    API.get("/bookings/user")
      .then(r => setBookings(r.data.data))
      .catch(() => setBookings([]));
  }, [msg]);

  const cancelar = async id => {
    setMsg("");
    try {
      await API.delete(`/bookings/${id}`);
      setMsg("Cancelado correctamente");
    } catch {
      setMsg("Error al cancelar");
    }
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Mis Inscripciones</h2>
      {msg && <p className="mb-4 text-green-600">{msg}</p>}
      <ul className="space-y-4">
        {bookings.map(bk => (
          <li key={bk._id} className="card flex justify-between items-center">
            <div>
              <span className="font-semibold">{bk.class?.title}</span> —{" "}
              <span className="text-sm text-gray-600">
                {bk.class && new Date(bk.class.startTime).toLocaleString()}
              </span>
            </div>
            <button onClick={() => cancelar(bk._id)} className="btn-danger">
              Darse de baja
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => logout()} className="btn-secondary mt-6">
        Cerrar sesión
      </button>
    </div>
  );
}
