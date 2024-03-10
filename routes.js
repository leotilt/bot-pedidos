const express = require("express");
const controller = require("./controller/twilioController");

const router = express.Router();

// Rota mensagem recebida
router.post("/", controller.handleIncomingMessage);

module.exports = router;
