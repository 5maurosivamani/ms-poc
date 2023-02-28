// Import required modules
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const PORT = 4002;

// Create a new instance of Express
const app = express();

// Install body-parser middleware to handle JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for handling GET requests to the root URL
app.get("/", (req, res) => {
  res.send("Users");
});

// Receive Events
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  console.log("Event Receive", type);
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
