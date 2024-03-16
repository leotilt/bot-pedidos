const twilio = require("twilio");

function sendGreetingMessage(res) {
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(
    "Olá! Bem vindo ao bot de pedidos, porfavor insira o numero do seu pedido."
  );
  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
}

module.exports = { sendGreetingMessage };
