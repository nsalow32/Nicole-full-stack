import { Server } from 'socket.io';

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log('🧐 Excuse me, but Socket is already running!');
    res.end();
    return;
  }

  const io = new Server(res.socket.server, { cors: { origin: 'http://localhost:3000' } });
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    console.log(`😱: ${socket.id} Guess what! A user just connected!`);
    socket.on('disconnect', () => {
      console.log('😥: A user disconnected');
    });
    socket.on('createdMessage', (msg) => {
      socket.broadcast.emit('newMessage', msg);
    });
  });
  res.end();
}
