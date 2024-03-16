const { MongoClient } = require("mongodb");
const database = require("../config/database");

async function connectToDatabase() {
  const client = new MongoClient(database.uri);
  await client.connect();
  return client.db("bot-pedidos");
}

async function findOnePedido(userMessage) {
  const db = await connectToDatabase();
  const pedidosCollection = db.collection("pedidos");
  const pedido = await pedidosCollection.findOne({
    numeroPedido: parseInt(userMessage),
  });
  return pedido;
}

module.exports = { findOnePedido };
