const express = require('express');
const path = require('node:path');
//const database = require('./database');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// public/ is beside back/, so go up one folder from this file.
const publicDirectory = path.join(__dirname, '..', 'public');

// Allow future API routes to read JSON request bodies.
app.use(express.json());

// Serve the HTML pages, CSS, and images inside public/.
app.use(express.static(publicDirectory));

// Open the site's welcome page at http://localhost:3000/
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectory, 'index.html'));
});

// Check whether Node can connect to the configured database.
app.get('/api/health/db', async (req, res) => {
  try {
    const [rows] = await database.query('SELECT 1 AS connected');

    res.json({
      server: 'ok',
      database: rows[0].connected === 1 ? 'connected' : 'not connected'
    });
  } catch (error) {
    console.error('Database connection error:', error.message);

    res.status(500).json({
      server: 'ok',
      database: 'not connected'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});