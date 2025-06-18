
# 💃 DanceBooking App

> **Sistema Full Stack para inscripción y gestión de clases de baile.**

---

## 📖 Tabla de Contenidos

- [✨ Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [⚙️ Instalación](#️-instalación)
- [🚀 Ejecución](#-ejecución)
- [📑 Documentación de la API](#-documentación-de-la-api)
- [🤝 Cómo Contribuir](#-cómo-contribuir)
- [📜 Licencia](#-licencia)
- [📝 Autor](#-autor)

---

## ✨ Características

- **Usuarios** pueden:
  - Registrarse e iniciar sesión mediante autenticación JWT.
  - Visualizar clases disponibles.
  - Inscribirse y cancelar sus inscripciones a clases.

- **Instructores** pueden:
  - Crear y gestionar sus propias clases.
  - Visualizar usuarios inscritos en sus clases.

- **Administradores** pueden:
  - Administrar usuarios y sus roles.
  - Crear y gestionar clases en nombre de instructores.
  - Gestionar inscripciones de usuarios mediante email.

---

## 🛠️ Tecnologías

### Frontend

- **React**
- **Vite**
- **TailwindCSS**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** (autenticación) + **Bcrypt** (hashing de contraseñas)

---

## ⚙️ Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/CarlosAsiB/dance-booking-app.git
cd dance-booking-app
```

### 2. Configuración del backend

```bash
cd server
npm install
cp .env.example .env
```

> ⚠️ **Importante:**  
> Edita el archivo `.env` con tu propia configuración para:
>
> - `MONGODB_URI` (URL de tu base de datos MongoDB)
> - `JWT_SECRET` (clave secreta para JWT)

### 3. Configuración del frontend

```bash
cd ../client
npm install
```

> ⚠️ **Opcional:** configura la URL del backend en `.env` si es diferente a `http://localhost:5000`.

---

## 🚀 Ejecución

### Backend

```bash
cd server
npm run dev
# o también puedes ejecutar con:
node server.js
```

### Frontend

```bash
cd client
npm run dev
```

> 💻 Accede en tu navegador a: [http://localhost:5173](http://localhost:5173)

---

## 📑 Documentación de la API

| Ruta                              | Método | Descripción                           | Rol                 |
|-----------------------------------|--------|---------------------------------------|---------------------|
| `/api/auth/register`              | POST   | Registrar usuario nuevo               | Público             |
| `/api/auth/login`                 | POST   | Iniciar sesión                        | Público             |
| `/api/classes`                    | GET    | Obtener todas las clases              | Usuario             |
| `/api/classes/:id`                | GET    | Obtener detalles de una clase         | Usuario             |
| `/api/classes`                    | POST   | Crear nueva clase                     | Instructor, Admin   |
| `/api/bookings`                   | POST   | Inscribirse en una clase              | Usuario             |
| `/api/bookings/:id`               | DELETE | Cancelar inscripción                  | Usuario             |
| `/api/admin/users`                | GET    | Listar usuarios                       | Admin               |
| `/api/admin/users/:id`            | DELETE | Eliminar usuario                      | Admin               |
| `/api/admin/classes/:id/bookings` | POST   | Inscribir usuario por email           | Admin               |
| `/api/admin/classes/:id/bookings/:bookingId`| DELETE | Eliminar inscripción de usuario  | Admin               |

---

## 🤝 Cómo Contribuir

¡Tus contribuciones son bienvenidas!

1. Haz un fork del proyecto.
2. Crea una nueva rama con un nombre descriptivo:
```bash
git checkout -b nueva-funcionalidad
```
3. Realiza tus cambios y confírmalos:
```bash
git commit -am 'Añade funcionalidad'
```
4. Sube tu rama:
```bash
git push origin nueva-funcionalidad
```
5. Crea una nueva **Pull Request** en GitHub.

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.  
Consulta el archivo [LICENSE](LICENSE) para más información.

---

## 📝 Autor

Creado con ❤️ por **Carlos Asi**.

- [GitHub](https://github.com/CarlosAsiB)
- [LinkedIn](https://www.linkedin.com/in/carlos-asi-baruj/) 

---

