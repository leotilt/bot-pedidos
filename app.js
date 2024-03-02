const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
const port = 3000;

// Usando um conjunto para armazenar IDs de mensagens processadas
const processedMessages = new Set();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Substitua com suas credenciais do Twilio
const accountSid = "AC2f6509d080e22ed45ba3b14c83f0e30c";
const authToken = "a53d1540ca71c107af4ba6ae61c53b00";

const client = twilio(accountSid, authToken);

// Rota para receber mensagens do Twilio apenas no endpoint "/"
app.post(
  "/",
  twilio.webhook(authToken, { host: "localhost", protocol: "http" }),
  (req, res) => {
    // Se chegou aqui, a requisição foi validada corretamente pelo Twilio
    const twilioMessage = req.body.Body;
    const senderPhoneNumber = req.body.From;
    const messageSid = req.body.MessageSid;

    // Verificar se a mensagem já foi processada
    if (processedMessages.has(messageSid)) {
      console.log(`Mensagem ${messageSid} já processada. Ignorando.`);
      res.sendStatus(200); // Responder com sucesso para evitar loop
      return;
    }

    // Adicionar a mensagem ao conjunto de mensagens processadas
    processedMessages.add(messageSid);

    // Adicionar "9" ao início do número
    const senderPhoneNumberWith9 = `+9${senderPhoneNumber.replace(/\D/g, "")}`;

    // Processar a mensagem recebida e preparar uma resposta
    const resposta = `Você disse: ${twilioMessage}`;

    // Enviar uma resposta com statusCallback
    client.messages
      .create({
        body: resposta,
        from: "whatsapp:+14155238886", // Substitua com seu número Twilio de WhatsApp
        to: `whatsapp:${senderPhoneNumberWith9}`, // Usar o número original com "9" adicionado
        statusCallback: "http://exemplo.com/status-callback", // Substitua com sua URL de callback real
      })
      .then(() => {
        console.log("Resposta enviada com sucesso.");
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error(`Erro ao enviar resposta: ${error.message}`);
        res.sendStatus(500);
      });
  }
);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
