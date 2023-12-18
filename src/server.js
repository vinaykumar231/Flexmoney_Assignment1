// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'registrationdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Define a route for handling form submissions
app.post('/api/register', (req, res) => {
  const formData = req.body;

  // Validate the data (you may add more validation)
  if (!formData.name || !formData.age || !formData.email || !formData.gender || !formData.phoneNumber || !formData.city || !formData.payment) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Save data to the database
  pool.execute(
    'INSERT INTO registrations (name, age, email, gender, phoneNumber, city, payment) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      formData.name,
      formData.age,
      formData.email,
      formData.gender,
      formData.phoneNumber,
      formData.city,
      formData.payment,
    ],
    (err, results) => {
      if (err) {
        console.error('Error saving data to the database:', err.message);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Form submitted successfully', data: formData });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
