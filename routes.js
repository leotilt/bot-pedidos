const express = require("express");
const controller = require("./controller/twilioController");

const router = express.Router();

// Rota para lidar com mensagens recebidas
router.post("/", controller.handleIncomingMessage);

module.exports = router;
