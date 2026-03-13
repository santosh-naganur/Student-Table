const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const mysql = require('mysql2');

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // update with your MySQL username
  password: 'root123', // update with your MySQL password
  database: 'studentdb' // update with your database name
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(cors());
app.use(express.json());

// Example API endpoint
app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/students', (req, res) => {
  const { name, email, age } = req.body;
  db.query('INSERT INTO students (name, email, age) VALUES (?, ?, ?)', [name, email, age], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Student added', student: { id: result.insertId, name, email, age } });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
