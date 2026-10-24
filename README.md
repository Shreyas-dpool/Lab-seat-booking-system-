# Lab Seat Booking System 🧪💻

A full-stack web application designed to manage and automate computer laboratory seat reservations for academic sessions. The system eliminates double-booking and slot collisions using relational database constraints.

---

## 📌 Project Overview
- **Student Name:** Shreyas H Suvarna
- **USN:** 1BM25CD104

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite) running on `http://localhost:5173`
- **Backend:** Node.js (v24.22.0), Express.js running on `http://localhost:5000`
- **Database:** MySQL Server (Port 3306)
- **API Architecture:** RESTful JSON Endpoints (`GET`, `POST`, `DELETE`)

---

## 🗄️ Database Architecture (`lab_db`)
The system strictly enforces double-booking prevention through UNIQUE database constraints:
- `UNIQUE (lab_id, slot_date, slot_no, seat_no)` - Prevents assigning the same seat to multiple students for a given slot.
- `UNIQUE (usn, slot_date, slot_no)` - Prevents a single student from reserving multiple seats in the same time slot.

---

## 🚀 Getting Started

### 1. Database Initialization
Run `schema.sql` in MySQL Workbench or via MySQL CLI to set up the database structure and sample data:
```bash
mysql -u root -p < schema.sql

