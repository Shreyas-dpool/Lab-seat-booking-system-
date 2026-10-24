const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root', 
  database: process.env.DB_NAME || 'lab_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL Database!');
  }
});

// GET all bookings
app.get('/api/bookings', (req, res) => {
  db.query('SELECT * FROM lab_booking ORDER BY booking_id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST create booking
app.post('/api/bookings', (req, res) => {
  const { lab_id, usn, slot_date, slot_no, seat_no } = req.body;
  const sql = 'INSERT INTO lab_booking (lab_id, usn, slot_date, slot_no, seat_no) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [lab_id, usn, slot_date, slot_no, seat_no || null], (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: 'Booking successful!', booking_id: result.insertId });
  });
});

// DELETE booking
app.delete('/api/bookings/:id', (req, res) => {
  db.query('DELETE FROM lab_booking WHERE booking_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Booking cancelled' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
