const twilio = require("twilio");
const { connectToDatabase } = require("../config/mongoDB");

async function searchOrderInMongoDB(req, res, userMessage) {
  const twiml = new twilio.twiml.MessagingResponse();

  try {
    const db = await connectToDatabase();
    const pedidosCollection = db.collection("pedidos");
    const pedido = await pedidosCollection.findOne({
      numeroPedido: parseInt(userMessage),
    });

    if (pedido) {
      let message = `Detalhes do Pedido ${userMessage}:\n`;
      message += `*Status*: ${pedido.status}\n`;
      message += `Data da Compra: ${pedido.dataCompra}\n`;
      message += "Celulares:\n";
      pedido.celulares.forEach((celular, index) => {
        message += `${index + 1}. Modelo: ${celular.modelo}\n`;
      });
      twiml.message(message);
    } else {
      twiml.message(`Pedido ${userMessage} não encontrado.`);
    }
  } catch (error) {
    console.error("Erro ao buscar o pedido:", error);
    twiml.message(
      "Ocorreu um erro ao buscar o pedido. Por favor, tente novamente mais tarde."
    );
  } finally {
    res.set("Content-Type", "text/xml");
    res.send(twiml.toString());
  }
}

module.exports = { searchOrderInMongoDB };
