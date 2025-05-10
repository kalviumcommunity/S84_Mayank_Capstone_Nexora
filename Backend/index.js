const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    const eventRoutes = require('./Routes/eventRoutes');
  const userRoutes = require('./Routes/userRoutes');
  const resourceRoutes = require('./Routes/resourceRoutes');
  const eventRoutes = require('./Routes/eventRoutes');
  
  app.use('/api/tasks', taskRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/resources', resourceRoutes);
  app.use('/api/events', eventRoutes);
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
