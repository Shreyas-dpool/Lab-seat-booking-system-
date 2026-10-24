import React, { useState, useEffect } from 'react';

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    usn: '1BM25CD104',
    lab_id: '1',
    slot_date: '2026-10-25',
    slot_no: '1',
    seat_no: ''
  });

  const fetchBookings = () => {
    fetch('http://localhost:5000/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBookings(data);
      })
      .catch((err) => setError('Failed to connect to server: ' + err.message));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to book seat');
        fetchBookings();
      })
      .catch((err) => setError(err.message));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/bookings/${id}`, { method: 'DELETE' })
      .then(() => fetchBookings());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Lab Seat Booking System</h2>

      {error && (
        <div style={{ color: 'red', background: '#fee', padding: '10px', marginBottom: '15px', border: '1px solid red', borderRadius: '4px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>New Reservation</h3>
        <label>Student USN:</label>
        <input value={form.usn} onChange={(e) => setForm({ ...form, usn: e.target.value })} required />
        
        <label>Select Lab Room:</label>
        <select value={form.lab_id} onChange={(e) => setForm({ ...form, lab_id: e.target.value })}>
          <option value="1">DBMS Lab (Lab 1)</option>
          <option value="2">Networks Lab (Lab 2)</option>
        </select>
        
        <label>Slot Date:</label>
        <input type="date" value={form.slot_date} onChange={(e) => setForm({ ...form, slot_date: e.target.value })} required />
        
        <label>Slot No (1 to 8):</label>
        <input type="number" min="1" max="8" value={form.slot_no} onChange={(e) => setForm({ ...form, slot_no: e.target.value })} required />
        
        <label>Seat No (Optional):</label>
        <input type="number" placeholder="e.g. 4 (Leave blank if unassigned)" value={form.seat_no} onChange={(e) => setForm({ ...form, seat_no: e.target.value })} />
        
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Reserve Seat
        </button>
      </form>

      <h3 style={{ marginTop: '30px' }}>Active Bookings Roster</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#e9ecef' }}>
            <th>Booking ID</th>
            <th>USN</th>
            <th>Lab ID</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Seat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.booking_id}>
              <td>{b.booking_id}</td>
              <td>{b.usn}</td>
              <td>{b.lab_id}</td>
              <td>{b.slot_date ? b.slot_date.split('T')[0] : ''}</td>
              <td>{b.slot_no}</td>
              <td>{b.seat_no ? `Seat ${b.seat_no}` : 'Unassigned'}</td>
              <td>
                <button onClick={() => handleDelete(b.booking_id)} style={{ color: 'red', cursor: 'pointer', background: '#fff', border: '1px solid red', borderRadius: '3px', padding: '4px 8px' }}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
