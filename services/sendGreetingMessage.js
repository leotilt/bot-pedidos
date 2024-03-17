const twilio = require("twilio");

function sendGreetingMessage(res) {
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(
    "Olá! Bem vindo ao BOT-PEDIDOS porfavor insira o numero do seu CPF, sem pontuação (12345678900)"
  );
  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
}

module.exports = { sendGreetingMessage };
