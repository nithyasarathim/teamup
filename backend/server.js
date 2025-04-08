const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./Routers/AuthRoutes');
const projectRoutes = require('./Routers/projectRoutes');
const notifyRoutes = require('./Routers/notifyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/notify', notifyRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log('DB connection error:', err));
