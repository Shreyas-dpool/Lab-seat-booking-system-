# Lab Seat Booking System 🧪💻

A full-stack web application designed to manage and automate computer laboratory seat reservations for academic sessions. The system eliminates double-booking and slot collisions using relational database constraints.

---

## 📌 Project Metadata
- **Student Name:** Shreyas H Suvarna
- **USN:** 1BM25CD104
- **Department:** Computer Science and Engineering (Data Science)
- **Institution:** B.M.S. College of Engineering (BMSCE)
- **Submission Date:** 24-10-26

---

## 🛠️ Tech Stack & Environment
- **Frontend:** React (Vite) running on `http://localhost:5173`
- **Backend:** Node.js (v24.22.0), Express.js running on `http://localhost:5000`
- **Database:** MySQL Server (Port 3306)
- **API Architecture:** RESTful Endpoints (`GET`, `POST`, `DELETE`)

---

## 📁 Repository Directory Structure

lab_project/
├── .gitignore
├── schema.sql
├── README.md
├── backend/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        └── App.jsx

---

## 🗄️ Database Architecture (`schema.sql`)

The MySQL database (`lab_db`) enforces strict reservation integrity using two UNIQUE key constraints:
- `UNIQUE (lab_id, slot_date, slot_no, seat_no)` - Prevents assigning the exact same lab seat to multiple students in a single slot.
- `UNIQUE (usn, slot_date, slot_no)` - Prevents a single student from holding multiple seat reservations simultaneously.

---

## ⚙️ Backend Implementation (`backend/server.js`)

The Node.js/Express server exposes 3 RESTful endpoints for database operations:
- `GET /api/bookings` : Retrieves active reservations sorted by descending booking ID.
- `POST /api/bookings` : Inserts a new booking after validating USN, slot, date, and seat parameters.
- `DELETE /api/bookings/:id` : Cancels and deletes an existing booking record by ID.

---

## 💻 Frontend Implementation (`frontend/src/App.jsx`)

The React application built with Vite features:
- Interactive reservation form with real-time field validation.
- Error handling banner for displaying database constraint errors (e.g., duplicate entries).
- Dynamic booking roster table rendering current active reservations with instant cancellation actions.

---

## 🚀 Step-by-Step Setup & Execution Guide

### Step 1: Database Setup
Import and execute `schema.sql` in MySQL Workbench or via command line:
`mysql -u root -p < schema.sql`

### Step 2: Backend API Setup
Open terminal in the backend directory, install packages, and start the Express server:
1. `cd backend`
2. `npm install`
3. `node server.js`
*(Server starts on http://localhost:5000)*

### Step 3: Frontend Setup
Open a second terminal in the frontend directory, install dependencies, and launch the Vite development server:
1. `cd frontend`
2. `npm install`
3. `npm run dev`
*(App runs on http://localhost:5173)*

---

## 📡 REST API Specifications

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/bookings` | Fetches all active laboratory seat reservations |
| **POST** | `/api/bookings` | Creates a new reservation (enforces MySQL UNIQUE constraints) |
| **DELETE** | `/api/bookings/:id` | Cancels and removes a reservation by `booking_id` |
