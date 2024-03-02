const express = require("express");
const router = express.Router();
const twilioController = require("../controllers/twilioController");

router.post("/", twilioController.handleIncomingMessage);

module.exports = router;
