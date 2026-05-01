const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "database",   // docker service name
  user: "root",
  password: "root",
  database: "studentdb"
});

// Connect DB
db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// Home route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// Get students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching students",
        error: err
      });
    }
    res.json(results);
  });
});

// Add student
app.post("/students", async (req, res) => {
  try {
    const { name, email, course, marks } = req.body;

    // Call Python service
    const pythonRes = await axios.post(
      "http://python-service:8000/analyze",
      { marks }
    );

    const { grade, status } = pythonRes.data;

    // Insert into MySQL
    const sql = `
      INSERT INTO students (name, email, course, marks, grade, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [name, email, course, marks, grade, status],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Insert failed",
            error: err
          });
        }

        res.json({
          message: "Student added successfully",
          studentId: result.insertId,
          grade,
          status
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Python service error",
      error: error.message
    });
  }
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Backend running on port 5000");
});