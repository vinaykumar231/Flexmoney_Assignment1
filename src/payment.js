const express = require('express');
const app = express();
const port = 3001;

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
  });