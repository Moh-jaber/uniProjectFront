const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "personality",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// =====================
// AUTH ROUTES
// =====================

// Signup - Create new user
app.post("/auth/signup", async (req, res) => {
  const { email, password, username } = req.body;

  // Validation
  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ error: "Email, username and password are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  // Check if email already exists
  const checkQuery = `SELECT id FROM users WHERE email = ${mysql.escape(
    email
  )}`;
  db.query(checkQuery, async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    try {
      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Generate UUID
      const userId = uuidv4();

      // Insert user
      const insertQuery = `INSERT INTO users (id, email, password, username) VALUES (${mysql.escape(
        userId
      )}, ${mysql.escape(email)}, ${mysql.escape(
        hashedPassword
      )}, ${mysql.escape(username)})`;

      db.query(insertQuery, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to create user", details: err });
        }
        res.status(201).json({ id: userId, email, username });
      });
    } catch (hashError) {
      return res.status(500).json({ error: "Error hashing password" });
    }
  });
});

// Login - Authenticate user
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const query = `SELECT id, email, password, username FROM users WHERE email = ${mysql.escape(
    email
  )}`;

  db.query(query, async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Return user info (without password)
      res.json({ id: user.id, email: user.email, username: user.username });
    } catch (compareError) {
      return res.status(500).json({ error: "Error verifying password" });
    }
  });
});

// =====================
// RESULT ROUTES
// =====================

app.get("/result/:id", (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM results WHERE user_id = ${mysql.escape(id)}`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(result);
  });
});

app.post("/result", (req, res) => {
  const data = req.body;
  if (!data?.id || !data?.result || !data?.date) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  // Generate UUID for the result
  const resultId = uuidv4();

  const query = `INSERT INTO results (id, user_id, res, date) VALUES (${mysql.escape(
    resultId
  )}, ${mysql.escape(data?.id)}, ${mysql.escape(data?.result)}, ${mysql.escape(
    data?.date
  )})`;

  db.query(query, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to add result", details: err });
    }
    res.json({ message: "Result added successfully" });
  });
});

app.delete("/result/:id", (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM results WHERE user_id = ${mysql.escape(id)}`;

  db.query(query, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to delete result", details: err });
    }
    res.json({ message: "Result deleted successfully" });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
