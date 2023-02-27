// Import required modules
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const PORT = 4001;
const mysql = require("mysql2");
const cors = require("cors");
const secretKey = 'mysecretkey';
const jwt = require('jsonwebtoken');

// Create a new instance of Express
const app = express();

//configure the cors package
app.use(cors());

// Create a connection pool to the MySQL database
const dbcon = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "register_db",
  connectionLimit: 10,
});

// Install body-parser middleware to handle JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for handling GET requests to the root URL
app.get("/", (req, res) => {
  res.send("Login!");
});

// POST route for handling login form submission
app.post("/login", (req, res) => {
  const { name, password } = req.body;

  // Check if username and password are present
  if (!name || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Get user from MySQL database
  dbcon.getConnection((err, connection) => {
    if (err) throw err;

    const sql = `SELECT * FROM users_tb WHERE name = ? `;

    connection.query(sql, [name], (error, results) => {
      connection.release();

      if (error) throw error;

      // Check if user exists
      if (!results.length) {
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }

      // Check if password is correct
      const user = results[0];
      if (user.password !== password) {
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }

      try {
        // Create a payload containing information about the user
        const payload = { name: user.name };

        // Create a JWT and send it in the response
        const token = jwt.sign(payload, secretKey);
        res.json({ token, message: "Login successful." });
      } catch (err) {
        res.status(500).json({ message: "Error creating token." });
      }

    });
  });
});

// Define an error-handling middleware function to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server on port from const PORT
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
