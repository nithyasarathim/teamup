const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./Routers/authRoutes');
const projectRoutes = require('./Routers/projectRoutes');
const notifyRoutes = require('./Routers/notifyRoutes');
const mailRoutes = require('./Routers/mailRoutes');

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());


app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/notify', notifyRoutes);
app.use('/mail', mailRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log('DB connection error:', err));


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (projectId) => {
    socket.join(projectId);
    console.log(`User joined room: ${projectId}`);
  });

  socket.on('sendMessage', ({ projectId, message }) => {
    io.to(projectId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
