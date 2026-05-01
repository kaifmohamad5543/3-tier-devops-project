const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ✅ MySQL Connection (IMPORTANT) */
const db = mysql.createConnection({
  host: "database",      // 🔥 MUST match docker-compose service name
  user: "root",
  password: "root",
  database: "studentdb"
});

/* ✅ Connect to DB */
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

/* ============================= */
/* ✅ GET STUDENTS */
app.get("/students", (req, res) => {
  const query = "SELECT * FROM students";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching students:", err);
      return res.status(500).json({
        message: "Error fetching students",
        error: err
      });
    }
    res.json(results);
  });
});

/* ============================= */
/* ✅ ADD STUDENT */
app.post("/students", (req, res) => {
  const { name, email, course, marks } = req.body;

  if (!name || !email || !course || !marks) {
    return res.status(400).json({ message: "All fields required" });
  }

  const query = `
    INSERT INTO students (name, email, course, marks)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, email, course, marks], (err, result) => {
    if (err) {
      console.error("❌ Insert error:", err);
      return res.status(500).json({
        message: "Error adding student",
        error: err
      });
    }

    res.json({ message: "✅ Student added successfully" });
  });
});

/* ============================= */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
