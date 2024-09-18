const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle signaling
  socket.on('offer', (data) => {
    socket.to(data.target).emit('offer', { offer: data.offer, from: socket.id });
  });

  socket.on('answer', (data) => {
    socket.to(data.target).emit('answer', { answer: data.answer, from: socket.id });
  });

  socket.on('ice-candidate', (data) => {
    socket.to(data.target).emit('ice-candidate', { candidate: data.candidate, from: socket.id });
  });
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
