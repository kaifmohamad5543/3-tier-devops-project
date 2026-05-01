CREATE DATABASE IF NOT EXISTS studentdb;

USE studentdb;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    course VARCHAR(100),
    marks INT,
    grade VARCHAR(50),
    status VARCHAR(50)
);

INSERT INTO students (name, email, course, marks, grade, status)
VALUES 
('Kaif', 'kaif@example.com', 'Software Engineering', 78, 'Distinction', 'Passed'),
('John', 'john@example.com', 'Computer Science', 65, 'Merit', 'Passed');