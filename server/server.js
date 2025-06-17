// server/server.js
const express   = require('express');
const cors      = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);


// ping rápido
app.get('/api', (req, res) => res.json({ message: 'API OK' }));

// monta routers de Express
app.use('/api/auth',    require('./routes/authRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// error handler
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
