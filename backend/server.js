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

// Health check API
app.get("/health", (req, res) => {
  res.json({
    status: "Backend API is healthy",
    service: "Node.js Backend",
    database: "MySQL",
    port: 5000
  });
});

// Get all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students ORDER BY id DESC", (err, results) => {
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

// Update student
app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
      UPDATE students
      SET name = ?, email = ?, course = ?, marks = ?, grade = ?, status = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [name, email, course, marks, grade, status, id],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Update failed",
            error: err
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            message: "Student not found"
          });
        }

        console.log(`✅ Student updated: ID ${id}`);

        res.json({
          message: "Student updated successfully",
          studentId: id,
          grade,
          status
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Update error",
      error: error.message
    });
  }
});

// Delete student
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM students WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Delete failed",
        error: err
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    console.log(`🗑️ Student deleted: ID ${id}`);

    res.json({
      message: "Student deleted successfully",
      studentId: id
    });
  });
});

app.listen(5000, () => {
  console.log("🚀 Backend running on port 5000");
});
