const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
require('./config/passport'); // Configure passport

const authRoutes = require('./Routes/authRoutes');
const taskRoutes = require('./Routes/taskRoutes');
const userListRoutes = require('./Routes/userRoutes'); // Renamed to avoid confusion with auth user
const resourceRoutes = require('./Routes/resourceRoutes');
const eventRoutes = require('./Routes/eventRoutes');

dotenv.config();
const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000', 
  'http://localhost:3001', 
  'http://localhost:4000', 
  'http://127.0.0.1:3000', 
  'http://127.0.0.1:3001', 
  'http://127.0.0.1:4000'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({ 
    origin: allowedOrigins, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})); 

app.use(express.json());
app.use(passport.initialize());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nexora')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/', authRoutes); // Handles /auth/* and current user check /api/user

// CRUD Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userListRoutes); // Admin-like route to list all users
app.use('/api/resources', resourceRoutes);
app.use('/api/events', eventRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
