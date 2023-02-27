// Import required modules
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const PORT = 4000;
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
  database: "register_db",
  connectionLimit: 10,
});

// Install body-parser middleware to handle JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for handling GET requests to the root URL
app.get("/", (req, res) => {
  res.send("Register!");
});

// Define a route for handling POST requests to register a new user
app.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if required fields are provided
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  // Insert new user data into the MySQL database
  dbcon.execute(
    "INSERT INTO users_tb (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, results) => {
      if (err) {
        console.error(err.stack);
        return res.status(500).send("Something went wrong!");
      }

      // Send a success response
      res.status(201).json({ message: "User registered successfully" });
    }
  );
});

// Define an error-handling middleware function to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server on port (CONST PORT)
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
