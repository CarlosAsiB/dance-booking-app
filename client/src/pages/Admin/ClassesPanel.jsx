import React, { useEffect, useState } from "react";
import API from "../../api";
import { useAuth } from "../../contexts/AuthContext";

export default function ClassesPanel() {
  const { logout } = useAuth();
  const [classes, setClasses] = useState([]);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "basic",
    capacity: 10,
    startTime: "",
    endTime: "",
    instructorEmail: ""
  });
  const [addEmail, setAddEmail] = useState({});

  const fetchClasses = () => {
    API.get("/admin/classes")
      .then(r => setClasses(r.data.data))
      .catch(() => setClasses([]));
  };
  useEffect(() => { fetchClasses(); }, [msg]);

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const { instructorEmail, ...data } = form;
      // buscar instructor
      const res = await API.get(`/admin/users?email=${instructorEmail}`);
      const inst = res.data.data.find(u => u.email===instructorEmail && u.role==="instructor");
      if (!inst) throw new Error("Instructor no encontrado");
      await API.post("/admin/classes", { ...data, instructor: inst._id });
      setMsg("Clase creada");
      setForm({ title:"",description:"",level:"basic",capacity:10,startTime:"",endTime:"",instructorEmail:"" });
      fetchClasses();
    } catch (err) {
      setMsg(err.message || "Error al crear");
    }
  };

  const borrar = async id => {
    if (!confirm("¿Eliminar clase?")) return;
    await API.delete(`/admin/classes/${id}`);
    setMsg("Clase eliminada");
    fetchClasses();
  };

  const bajaInscripcion = async (classId, bookingId) => {
    if (!confirm("¿Dar de baja usuario?")) return;
    await API.delete(`/admin/classes/${classId}/bookings/${bookingId}`);
    setMsg("Usuario dado de baja");
    fetchClasses();
  };

  const agregarUsuario = async (e, classId) => {
    e.preventDefault();
    try {
      await API.post(`/admin/classes/${classId}/bookings`, { email: addEmail[classId] });
      setMsg("Usuario inscripto");
      setAddEmail(ae => ({ ...ae, [classId]:"" }));
      fetchClasses();
    } catch (err) {
      setMsg(err.response?.data?.error || "Error al inscribir");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Clases (Admin)</h2>
        <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Cerrar sesión</button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Crear clase</h3>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input name="title" placeholder="Título" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} required className="border rounded px-3 py-2"/>
          <input name="instructorEmail" type="email" placeholder="Email instructor" value={form.instructorEmail} onChange={e=>setForm(f=>({...f,instructorEmail:e.target.value}))} required className="border rounded px-3 py-2"/>
          <textarea name="description" placeholder="Descripción" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} required className="border rounded px-3 py-2 col-span-full"/>
          <select name="level" value={form.level} onChange={e=>setForm(f=>({...f,level:e.target.value}))} className="border rounded px-3 py-2">
            <option value="basic">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
          <input name="capacity" type="number" min="1" placeholder="Cupo" value={form.capacity} onChange={e=>setForm(f=>({...f,capacity:e.target.value}))} required className="border rounded px-3 py-2"/>
          <input name="startTime" type="datetime-local" value={form.startTime} onChange={e=>setForm(f=>({...f,startTime:e.target.value}))} required className="border rounded px-3 py-2"/>
          <input name="endTime"   type="datetime-local" value={form.endTime  } onChange={e=>setForm(f=>({...f,endTime:e.target.value}))}   required className="border rounded px-3 py-2"/>
          <button type="submit" className="col-span-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Crear clase</button>
        </form>
        {msg && <p className="mt-2 text-sm text-red-600">{msg}</p>}
      </div>

      <ul className="space-y-4">
        {classes.map(c => (
          <li key={c._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold">{c.title}</h4>
                <p className="text-sm text-gray-600">
                  {new Date(c.startTime).toLocaleString()} – {new Date(c.endTime).toLocaleString()}
                </p>
                <p className="text-gray-700">{c.description}</p>
                <p className="text-sm">Nivel: {c.level} | Cupo: {c.capacity}</p>
                <p className="text-sm">Instructor: {c.instructor?.firstName} {c.instructor?.lastName}</p>
              </div>
              <button onClick={()=>borrar(c._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Eliminar
              </button>
            </div>
            <details className="mt-3">
              <summary className="cursor-pointer text-indigo-600">Ver inscriptos</summary>
              <ul className="mt-2 space-y-1">
                {c.bookings?.length
                  ? c.bookings.map(bk => (
                      <li key={bk._id} className="flex justify-between items-center">
                        <span>{bk.user?.firstName} {bk.user?.lastName} ({bk.user?.email})</span>
                        <button onClick={()=>bajaInscripcion(c._id,bk._id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                          Dar de baja
                        </button>
                      </li>
                    ))
                  : <li className="text-gray-500">No hay inscriptos</li>
                }
              </ul>
              <form className="mt-2 flex space-x-2" onSubmit={e=>agregarUsuario(e,c._id)}>
                <input
                  type="email"
                  placeholder="Email para inscribir"
                  value={addEmail[c._id]||""}
                  onChange={e=>setAddEmail(ae=>({...ae,[c._id]:e.target.value}))}
                  required
                  className="flex-1 border rounded px-3 py-1"
                />
                <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">Agregar</button>
              </form>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
