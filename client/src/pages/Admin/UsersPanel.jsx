import { useEffect, useState } from "react";
import API from "../../api";
import { useAuth } from "../../contexts/AuthContext";

export default function UsersPanel() {
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    API.get("/admin/users").then(r => setUsers(r.data.data));
  }, [msg]);

  const borrar = async id => {
    if (!confirm("¿Eliminar usuario?")) return;
    await API.delete(`/admin/users/${id}`);
    setMsg("Usuario eliminado");
  };

  const cambiarRol = async (id, role) => {
    await API.put(`/admin/users/${id}/role`, { role });
    setMsg("Rol actualizado");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Usuarios (Admin)</h2>
        <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Cerrar sesión</button>
      </div>
      {msg && <p className="text-green-600">{msg}</p>}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Rol</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="even:bg-gray-50">
                <td className="px-4 py-2">{u.firstName} {u.lastName}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={u.role}
                    onChange={e => cambiarRol(u._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => borrar(u._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
