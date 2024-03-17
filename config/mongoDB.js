const { MongoClient } = require("mongodb");
const database = require("../config/database");

async function connectToDatabase() {
  const client = new MongoClient(database.uri);
  await client.connect();
  return client.db("bot-pedidos");
}

async function findPedidosByCPF(cpf) {
  const db = await connectToDatabase();
  const pedidosCollection = db.collection("pedidos");
  const pedidos = await pedidosCollection.find({ cpf }).toArray();
  return pedidos;
}

module.exports = { findPedidosByCPF };
