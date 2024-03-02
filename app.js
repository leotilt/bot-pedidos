// app.js
const express = require("express");
const bodyParser = require("body-parser");
const twilioController = require("./twilioController");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", twilioController.handleIncomingMessage);

module.exports = app;
