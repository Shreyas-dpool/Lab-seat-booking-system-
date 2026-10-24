CREATE DATABASE IF NOT EXISTS lab_db;
USE lab_db;

CREATE TABLE IF NOT EXISTS lab (
    lab_id INT PRIMARY KEY,
    lab_name VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS student (
    usn VARCHAR(12) PRIMARY KEY,
    full_name VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS lab_booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    lab_id INT NOT NULL,
    usn VARCHAR(12) NOT NULL,
    slot_date DATE NOT NULL,
    slot_no INT NOT NULL CHECK (slot_no BETWEEN 1 AND 8),
    seat_no INT NULL,
    FOREIGN KEY (lab_id) REFERENCES lab(lab_id),
    FOREIGN KEY (usn) REFERENCES student(usn),
    UNIQUE (lab_id, slot_date, slot_no, seat_no),
    UNIQUE (usn, slot_date, slot_no)
);

INSERT INTO lab (lab_id, lab_name) VALUES 
  (1, 'DBMS Lab'), 
  (2, 'Networks Lab');

INSERT INTO student (usn, full_name) VALUES 
  ('1BM24EC607', 'Ram' ), 
  ('1BM24CS002', 'Ravi'),('1BM23EE203','Tom');
select * from lab_booking;
