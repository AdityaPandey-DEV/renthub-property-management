require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://renthub-property-management.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join a chat room
  socket.on('join_chat', (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  // Send message
  socket.on('send_message', (message) => {
    // Broadcast to everyone in the room except sender (or including sender, depending on frontend logic)
    // Usually, we want to emit to the room so the other person receives it
    socket.to(message.chat._id).emit('receive_message', message);
  });

  // Typing indicator
  socket.on('typing', (chatId) => {
    socket.to(chatId).emit('display_typing', chatId);
  });

  socket.on('stop_typing', (chatId) => {
    socket.to(chatId).emit('hide_typing', chatId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io accessible globally if needed (e.g., in controllers)
app.set('io', io);

server.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   🏠 RentHub API Server                                   ║
  ║                                                           ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}                              ║
  ║   Port: ${PORT}                                              ║
  ║   URL: http://localhost:${PORT}                              ║
  ║   Socket.io: Enabled                                      ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
