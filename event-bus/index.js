const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql2");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a connection pool to the MySQL database
const dbcon = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "event_bus_db",
  connectionLimit: 10,
});

app.get("/events", (req, res)=>{
  // Get events from MySQL database
  dbcon.getConnection((err, connection) => {
    if (err) throw err;

    const sql = `SELECT * FROM event_tb WHERE 1`;

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
})

app.post("/events", async (req, res) => {
  const event = req.body;
  const { type, data } = event;

  const eventData = await JSON.stringify(data);

  // Insert new user data into the MySQL database
  dbcon.execute(
    "INSERT INTO event_tb (type, data) VALUES (?, ?)",
    [type,eventData],
    async (err, results) => {
      if (err) {
        console.error(err.stack);
        console.log("failed to store event_tb");
      }
    }
  );

  try {
    await axios.post("http://localhost:4000/events", event);
    await axios.post("http://localhost:4001/events", event);
    await axios.post("http://localhost:4002/events", event);
    await axios.post("http://localhost:5002/events", event);
  } catch (err) {
    console.log("Error", err);
  }

  res.send({ status: "OK" });
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, (err) => {
  if (err) {
    console.log("Server Error: ", err);
  }

  console.log("Server Started at Port", port);
});
