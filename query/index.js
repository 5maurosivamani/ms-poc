// Import required modules
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const PORT = 5002;
const mysql = require("mysql2");
const cors = require("cors");

// Create a new instance of Express
const app = express();

//configure the cors package
app.use(cors());

// Create a connection pool to the MySQL database
const dbcon = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "query_db",
  connectionLimit: 10,
});

// Install body-parser middleware to handle JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for handling GET requests to the root URL
app.get("/", (req, res) => {
  res.send("Query!");
});

// POST route for handling login form submission
app.get("/users", (req, res) => {
  // Get user from MySQL database
  dbcon.getConnection((err, connection) => {
    if (err) throw err;

    const sql = `SELECT * FROM users_tb WHERE 1`;

    connection.query(sql, (error, results, fields) => {
      connection.release();

      if (error) throw error;

      // Check if user exists
      if (!results.length) {
        return res.status(404).json({ message: "No records found" });
      }

      res.status(200).json(results);
    });
  });
});

// Receive Events
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "UserRegisterd") {
    const { insertId, name, email, password } = data;

    // Insert new user data into the query database
    dbcon.execute(
      "INSERT INTO users_tb (id, name, email, password) VALUES (?, ?, ?, ?)",
      [insertId, name, email, password],
      (err, results) => {
        if (err) {
          console.error(err.stack);
          return res.status(500).send("Something went wrong!");
        }

        return res.status(201).send("Successfully Stored in query db!");
      }
    );
  }
});

// Define a route for handling GET requests to the root URL
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
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
