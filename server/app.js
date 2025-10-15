const express = require('express');
const cors = require('cors');
require('express-async-errors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.get('/api/v1/ping', (req, res) => res.json({ message: 'pong' }));
app.get('/', (req, res) => {
  res.send('API server is running');
});


app.use(errorHandler);

module.exports = app;
