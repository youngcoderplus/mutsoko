const express = require('express');
const path = require('node:path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, '..', 'public');

app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectory, 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Commonplace is running at http://localhost:${PORT}`);
});