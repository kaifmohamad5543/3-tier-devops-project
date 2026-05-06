const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "database",
  user: "root",
  password: "root",
  database: "studentdb"
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// Health check API added by Pradeep
app.get("/health", (req, res) => {
  res.json({
    status: "Backend API is healthy",
    service: "Node.js Backend",
    database: "MySQL",
    port: 5000
  });
});

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

app.post("/students", async (req, res) => {
  try {
    const { name, email, course, marks } = req.body;

    if (!name || !email || !course || marks === undefined) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const pythonRes = await axios.post("http://python-service:8000/analyze", {
      marks
    });

    const { grade, status } = pythonRes.data;

    const sql = `
      INSERT INTO students (name, email, course, marks, grade, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, email, course, marks, grade, status], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Insert failed",
          error: err
        });
      }

      console.log(`✅ Student added: ${name}`);

      res.json({
        message: "Student added successfully",
        studentId: result.insertId,
        grade,
        status
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Python service error",
      error: error.message
    });
  }
});

app.listen(5000, () => {
  console.log("🚀 Backend running on port 5000");
});