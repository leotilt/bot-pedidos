// twilioController.js

const twilio = require("twilio");
const database = require("../config/database");

// Configuração do Twilio
const twilioClient = twilio(database.accountSid, database.authToken);

// Função para lidar com mensagens recebidas
async function handleIncomingMessage(req, res) {
  const twiml = new twilio.twiml.MessagingResponse();

  // Responder com uma mensagem simples
  twiml.message("Oi, qual o seu pedido?");

  // Enviar a resposta
  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
}

module.exports = {
  handleIncomingMessage,
};
