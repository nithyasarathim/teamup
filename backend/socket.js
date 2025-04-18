// socket.js
const { Server } = require('socket.io');
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST'],
    },
  });
  return io; 
};

const getIo = () => io;

module.exports = { initializeSocket, getIo };
