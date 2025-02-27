const express = require("express");
const controller = require("./controllers/twilioController");

const router = express.Router();

// Rota mensagem recebida
router.post("/", controller.processIncomingMessage);

module.exports = router;
