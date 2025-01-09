const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let fuelRecords = [];

// Laeb kõik kütusekoguse kirjed
app.get("/api/fuelRecords", (req, res) => {
  res.json(fuelRecords);
});

// Lisab uus kütusekoguse kirje
app.post("/api/fuelRecords", (req, res) => {
  const newRecord = req.body;
  fuelRecords.push(newRecord);
  res.status(201).json(newRecord);
});

// Kustutab kütusekoguse ID järgi
app.delete("/api/fuelRecords/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  fuelRecords = fuelRecords.filter((_, index) => index !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
