// server.js
const app = require('./app'); // import the Express app instance
require('dotenv').config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Here you can add actual DB connection if needed
    console.log('Database connected');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
