// twilioController.js
const twilio = require("twilio");
const { accountSid, authToken } = require("./database");
const { getGreeting, add9ToBrazilianPhoneNumber } = require("./utils");

const client = twilio(accountSid, authToken);
const processedMessages = new Set();

const waitForUserResponse = async (senderPhoneNumber) => {
  const timeout = 30000; // Tempo limite  (30 segundos)

  const startTime = new Date().getTime();

  try {
    while (new Date().getTime() - startTime < timeout) {
      const messages = await client.messages.list({
        from: `whatsapp:${senderPhoneNumber}`,
        to: "whatsapp:+14155238886",
      });

      if (messages.length > 0) {
        // Existe uma resposta do usuário
        return messages[0].body;
      }

      // Aguardar antes de verificar novamente
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Aguarda 1 segundo
    }

    // Nenhuma resposta do usuário dentro do tempo limite
    return null;
  } catch (error) {
    console.error(`Erro ao aguardar resposta do usuário: ${error.message}`);
    throw error;
  }
};

const sendGreetingAndAskForOrder = async (to) => {
  try {
    // Lógica para determinar a saudação com base no horário do dia
    const greeting = getGreeting();

    // Enviar saudação
    await client.messages.create({
      body: greeting,
      from: "whatsapp:+14155238886", // Substitua pelo seu número Twilio
      to: to,
    });

    // Esperar um pouco antes de enviar a próxima mensagem
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Pergunta sobre o número do pedido
    const orderQuestion = "Qual é o número do seu pedido?";
    await client.messages.create({
      body: orderQuestion,
      from: "whatsapp:+14155238886", // Substitua pelo seu número Twilio
      to: to,
    });

    console.log(
      "Saudação e pergunta sobre o número do pedido sendo enviadas..."
    );

    // Esperar pela resposta do usuário
    const userResponse = await waitForUserResponse(to);

    if (userResponse !== null) {
      console.log(`Resposta do usuário: ${userResponse}`);
    } else {
      console.log("Nenhuma resposta do usuário dentro do tempo limite.");
    }

    console.log("Saudação e pergunta enviadas com sucesso.");
  } catch (error) {
    console.error(
      `Erro ao enviar saudação e pergunta sobre o número do pedido: ${error.message}`
    );
    throw error;
  }
};
const handleIncomingMessage = async (req, res) => {
  try {
    if (!req.body || !req.body.Body) {
      console.error(
        `Mensagem inválida recebida. Corpo da requisição está vazio. ${req.body}`
      );
      return res.sendStatus(400);
    }

    const twilioMessage = req.body.Body.toLowerCase();
    const senderPhoneNumber = req.body.From;
    const messageSid = req.body.MessageSid;

    if (processedMessages.has(messageSid)) {
      console.log(`Mensagem ${messageSid} já processada. Ignorando.`);
      return res.sendStatus(200);
    }

    processedMessages.add(messageSid);

    const senderPhoneNumberWith9 =
      add9ToBrazilianPhoneNumber(senderPhoneNumber);

    await sendGreetingAndAskForOrder(senderPhoneNumberWith9);

    return res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao processar mensagem:", error.message || error);
    return res.sendStatus(500);
  }
};

module.exports = {
  handleIncomingMessage,
};
