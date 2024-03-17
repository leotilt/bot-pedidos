const twilio = require("twilio");
const { findOnePedido } = require("../config/mongoDB.js");
const { formatDate, hideCPF } = require("../utils/utils.js");

async function searchOrderInMongoDB(req, res, userMessage) {
  const twiml = new twilio.twiml.MessagingResponse();

  try {
    let pedido;
    if (!isNaN(userMessage)) {
      pedido = await findOnePedido(userMessage);
    } else {
      pedido = await findOnePedidoByCPF(userMessage);
    }

    if (pedido) {
      let message = "Detalhes do pedido:\n\n";
      message += "🏷️ Número do Pedido: " + pedido.numeroPedido + "\n";
      message +=
        "👤 CPF: " +
        (pedido.cpf ? hideCPF(pedido.cpf) : "Não disponível") +
        "\n";
      message += "⏳ Status: " + pedido.status + "\n";

      message += "📅 Data da Compra: " + formatDate(pedido.dataCompra) + "\n";
      message += "Celulares:\n";
      pedido.celulares.forEach((celular, index) => {
        message += index + 1 + ". Modelo: " + celular.modelo + "\n";
      });

      twiml.message(message);
    } else {
      twiml.message("Pedido " + userMessage + " não encontrado.");
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

// Função para buscar pedido pelo CPF
async function findOnePedidoByCPF(cpf) {
  const pedido = await findOnePedido({ cpf });
  return pedido;
}

// Função para ocultar os primeiros dígitos do CPF

module.exports = { searchOrderInMongoDB };
