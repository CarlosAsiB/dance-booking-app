# DanceBooking App

Aplicación full-stack para gestionar reservas de clases de baile, con roles de **usuario**, **instructor** y **admin**.

---

## 📂 Estructura del proyecto

dance-booking-app/
├─ server/ # Backend (Node.js + Express + MongoDB)
│ ├─ controllers/
│ ├─ middleware/
│ ├─ models/
│ ├─ routes/
│ ├─ config/
│ ├─ scripts/
│ ├─ .env.example
│ ├─ package.json
│ └─ server.js
└─ client/ # Frontend (React + Vite + Tailwind CSS)
├─ public/
├─ src/
│ ├─ api/
│ ├─ components/
│ ├─ contexts/
│ ├─ pages/
│ ├─ routes/
│ ├─ App.jsx
│ ├─ main.jsx
│ └─ index.css
├─ package.json
└─ tailwind.config.js


---

## 🚀 Instalación

### 1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/dance-booking-app.git
cd dance-booking-app
2. Backend
bash
Copy
Edit
cd server
npm install
cp .env.example .env
# Edita `.env` con tus variables:
# MONGODB_URI, JWT_SECRET, SALT_ROUNDS, PORT
npm run dev
3. Frontend
bash
Copy
Edit
cd ../client
npm install
# Si quieres usar variables en el cliente, crea un `.env`:
# VITE_API_BASE_URL=http://localhost:5000/api
npm run dev
Abre en el navegador: http://localhost:5173

⚙️ Variables de entorno
server/.env
dotenv
Copy
Edit
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=una_clave_secreta_para_jwt
SALT_ROUNDS=10
PORT=5000
client/.env (opcional)
dotenv
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000/api
📋 Scripts disponibles
Backend (server/package.json)
npm run dev — Inicia con nodemon

npm test — (pendiente)

Frontend (client/package.json)
npm run dev — Levanta Vite en modo desarrollo

npm run build — Genera la versión de producción

🛠 Tecnologías
Backend: Node.js · Express · MongoDB · Mongoose · JWT · bcrypt

Frontend: React · Vite · React Router · Context API · Tailwind CSS

🔐 Seguridad & Buenas prácticas
No subir el fichero .env real (ya incluido en .gitignore)

Validación de datos con Mongoose + hooks

Rate limiting y Helmet (configurar en server.js si se desea)

CORS configurado para tu dominio

📖 Documentación de la API
Auth

POST /api/auth/register

POST /api/auth/login

Clases

GET /api/classes

POST /api/classes (instructor/admin)

GET /api/classes/:id

PUT /api/classes/:id (instructor/admin)

DELETE /api/classes/:id (instructor/admin)

Bookings

POST /api/bookings

GET /api/bookings/user

DELETE /api/bookings/:id

Admin

GET /api/admin/users

POST /api/admin/users

PUT /api/admin/users/:id/role

DELETE /api/admin/users/:id

GET /api/admin/classes

POST /api/admin/classes

DELETE /api/admin/classes/:id

GET /api/admin/classes/:id/bookings

POST /api/admin/classes/:id/bookings

DELETE /api/admin/classes/:id/bookings/:bookingId

🤝 Contribuciones
¡Pull requests bienvenidos! Por favor abre issues para sugerencias o bugs.
