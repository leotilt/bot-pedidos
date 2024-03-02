// twilioController.js
const twilio = require("twilio");
const { accountSid, authToken } = require("./database");
const { add9ToBrazilianPhoneNumber } = require("./utils");

const client = twilio(accountSid, authToken);
const processedMessages = new Set();

const waitForUserResponse = async (senderPhoneNumber) => {
  const timeout = 30000; // Tempo limite (30 segundos)
  const startTime = new Date().getTime();

  try {
    while (new Date().getTime() - startTime < timeout) {
      const messages = await client.messages.list({
        from: `whatsapp:${senderPhoneNumber}`,
        to: "whatsapp:+14155238886",
      });

      if (messages.length > 0) {
        return messages[0].body; // Retorna a resposta do usuário
      }

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Aguarda 1 segundo
    }

    return null; // Nenhuma resposta do usuário dentro do tempo limite
  } catch (error) {
    console.error(`Erro ao aguardar resposta do usuário: ${error.message}`);
    throw error;
  }
};

const handleIncomingMessage = async (req, res) => {
  try {
    if (!req.body || !req.body.Body) {
      console.error(
        "Mensagem inválida recebida. Corpo da requisição está vazio."
      );
      return res.sendStatus(400);
    }

    const senderPhoneNumber = req.body.From;
    const messageSid = req.body.MessageSid;

    if (processedMessages.has(messageSid)) {
      console.log(`Mensagem ${messageSid} já processada. Ignorando.`);
      return res.sendStatus(200);
    }

    processedMessages.add(messageSid);

    const senderPhoneNumberWith9 =
      add9ToBrazilianPhoneNumber(senderPhoneNumber);

    // Pergunta sobre o número do pedido
    await client.messages.create({
      body: "Oi! Qual é o número do seu pedido?",
      from: "whatsapp:+14155238886",
      to: senderPhoneNumberWith9,
    });

    console.log("Pergunta sobre o número do pedido enviada...");

    // Esperar pela resposta do usuário
    const userResponse = await waitForUserResponse(senderPhoneNumberWith9);

    if (userResponse !== null) {
      console.log(`Resposta do usuário: ${userResponse}`);
    } else {
      console.log("Nenhuma resposta do usuário dentro do tempo limite.");
    }

    console.log("Pergunta sobre o número do pedido enviada com sucesso.");
    return res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao processar mensagem:", error.message || error);
    return res.sendStatus(500);
  }
};

module.exports = {
  handleIncomingMessage,
};
