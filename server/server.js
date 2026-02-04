require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   🏠 RentHub API Server                                   ║
  ║                                                           ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}                              ║
  ║   Port: ${PORT}                                              ║
  ║   URL: http://localhost:${PORT}                              ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
