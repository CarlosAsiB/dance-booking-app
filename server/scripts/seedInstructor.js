// scripts/seedInstructor.js
require('dotenv').config();
const connectDB = require('../config/db');      // <-- aquí
const User      = require('../models/User');    // <-- y aquí

(async () => {
  await connectDB();
  const instructor = await User.create({
    firstName: 'Lucía',
    lastName:  'González',
    email:     'lucia@danceapp.com',
    password:  'InstructorPass!',
    role:      'instructor'
  });
  console.log('Instructor creado:', instructor);
  process.exit(0);
})();
