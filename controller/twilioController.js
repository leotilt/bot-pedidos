const twilio = require("twilio");
const database = require("./config/database");

// Configuração do Twilio
const twilioClient = twilio(database.accountSid, database.authToken);

function handleIncomingMessage(req, res) {
  const twilioSignature = req.headers["x-twilio-signature"];

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message("Oi, qual o seu pedido?");

  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
}

module.exports = {
  handleIncomingMessage,
};
