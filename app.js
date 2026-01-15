const express = require("express");
const { join } = require("node:path");

const app = express();

// Middleware
app.use(express.static(join(__dirname)));

// Routes
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

module.exports = app;
