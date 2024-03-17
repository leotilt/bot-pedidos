const twilio = require("twilio");
const { findPedidosByCPF } = require("../config/mongoDB.js");
const { formatDate, hideCPF, isValidCPF } = require("../utils/utils.js");

async function searchOrderInMongoDB(req, res, userMessage) {
  try {
    // Validar se o userMessage é um CPF válido
    if (!isValidCPF(userMessage)) {
      const twiml = new twilio.twiml.MessagingResponse();
      twiml.message("CPF inválido. Por favor, insira um CPF válido.");
      res.set("Content-Type", "text/xml");
      return res.send(twiml.toString());
    }

    // Buscar todos os pedidos pelo CPF
    const pedidos = await findPedidosByCPF(userMessage);

    if (pedidos.length > 0) {
      const twiml = new twilio.twiml.MessagingResponse();
      pedidos.forEach((pedido, index) => {
        let message = "Detalhes do pedido " + (index + 1) + ":\n\n";
        message += "🏷️ Número do Pedido: " + pedido.numeroPedido + "\n";
        message +=
          "👤 CPF: " +
          (pedido.cpf ? hideCPF(pedido.cpf) : "Não disponível") +
          "\n";
        message += "⏳ Status: " + pedido.status + "\n";
        message += "📅 Data da Compra: " + formatDate(pedido.dataCompra) + "\n";
        message += "Celulares:\n";
        pedido.celulares.forEach((celular, idx) => {
          message += "  " + (idx + 1) + ". Modelo: " + celular.modelo + "\n";
        });
        message += "\n";

        twiml.message(message);
      });
      res.set("Content-Type", "text/xml");
      return res.send(twiml.toString());
    } else {
      const twiml = new twilio.twiml.MessagingResponse();
      twiml.message("Nenhum pedido encontrado para o CPF fornecido.");
      res.set("Content-Type", "text/xml");
      return res.send(twiml.toString());
    }
  } catch (error) {
    console.error("Erro ao buscar os pedidos:", error);
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(
      "Ocorreu um erro ao buscar os pedidos. Por favor, tente novamente mais tarde."
    );
    res.set("Content-Type", "text/xml");
    return res.send(twiml.toString());
  }
}

module.exports = { searchOrderInMongoDB };
