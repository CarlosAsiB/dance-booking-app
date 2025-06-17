# 💃 DanceBooking App

> **Sistema Full Stack para inscripción y gestión de clases de baile**

---

<p align="center">
  <img src="https://via.placeholder.com/800x250.png?text=DanceBooking+App" alt="DanceBooking Logo"/>
</p>

<p align="center">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/tu-usuario/dance-booking-app">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/tu-usuario/dance-booking-app">
  <img alt="License" src="https://img.shields.io/github/license/tu-usuario/dance-booking-app">
</p>

---

## 📖 Tabla de Contenidos

- [✨ Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [⚡ Instalación](#-instalación)
- [🚦 Ejecución](#-ejecución)
- [📑 Documentación de la API](#-documentación-de-la-api)
- [🤝 Cómo contribuir](#-cómo-contribuir)
- [📜 Licencia](#-licencia)

---

## ✨ Características

- **Usuarios** pueden:
  - Registrarse e iniciar sesión con autenticación JWT.
  - Ver, inscribirse o cancelar inscripciones en clases.

- **Instructores** pueden:
  - Crear y gestionar sus propias clases.
  - Ver usuarios inscritos en sus clases.

- **Administradores** pueden:
  - Gestionar usuarios y sus roles.
  - Crear clases a nombre de instructores.
  - Administrar inscripciones de usuarios.

---

## 🛠️ Tecnologías

| Frontend | Backend          | Base de datos    | Estilos         |
|----------|------------------|------------------|-----------------|
| React    | Node.js + Express| MongoDB + Mongoose| TailwindCSS     |
| Vite     | JWT + Bcrypt     |                 |                 |

---

## ⚡ Instalación

1. **Clona el repositorio:**
```sh
git clone https://github.com/CarlosAsiB/dance-booking-app.git
cd dance-booking-app


Configura el Backend:
cd server
npm install
cp .env.example .env
# Configura MONGODB_URI, JWT_SECRET y otros en .env


Configura el Frontend:
cd ../client
npm install
# (Opcional) Configura .env con URL del backend

🚦 Ejecución

Backend:
cd server
node server.js

Frontend:
cd client
npm run dev


Accede en tu navegador: http://localhost:5173




📑 Documentación de la API
Ruta	Método	Descripción	Rol
/api/auth/register	POST	Registrar usuario nuevo	Público
/api/auth/login	POST	Iniciar sesión	Público
/api/classes	GET	Obtener todas las clases	Usuario
/api/classes/:id	GET	Obtener detalles de una clase	Usuario
/api/classes	POST	Crear nueva clase	Instructor, Admin
/api/bookings	POST	Inscribirse en una clase	Usuario
/api/bookings/:id	DELETE	Cancelar inscripción	Usuario
/api/admin/users	GET	Listar usuarios	Admin
/api/admin/users/:id	DELETE	Eliminar usuario	Admin
/api/admin/classes/:id/bookings	POST	Inscribir usuario por email	Admin
/api/admin/classes/:id/bookings/:id	DELETE	Eliminar inscripción de usuario	Admin

🤝 Cómo contribuir

¡Las contribuciones son bienvenidas!

Haz un fork del proyecto.

Crea una rama (git checkout -b nueva-funcionalidad)

Realiza tus cambios (git commit -m 'Añade funcionalidad')

Sube la rama (git push origin nueva-funcionalidad)

Crea una nueva Pull Request.

📜 Licencia
Este proyecto está bajo la licencia MIT. Ver LICENSE para más información.

📝 Autor
Hecho con ❤️ por Carlos Asi
