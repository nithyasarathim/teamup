// server.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./Routers/authRoutes');
const projectRoutes = require('./Routers/projectRoutes');
const notifyRoutes = require('./Routers/notifyRoutes');
const discussRoutes = require('./Routers/discussRoutes');
const mailRoutes = require('./Routers/mailRoutes');
const postRoutes = require('./Routers/postRoutes');

const { initializeSocket } = require('./socket');

const app = express();
const server = http.createServer(app); 

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/notify', notifyRoutes);
app.use('/mail', mailRoutes);
app.use('/discuss', discussRoutes);
app.use('/post', postRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server running at http://localhost:${process.env.PORT || 8000}`);
    });
  })
  .catch(err => console.log('DB connection error:', err));

initializeSocket(server);
