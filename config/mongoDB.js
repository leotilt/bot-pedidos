const { MongoClient } = require("mongodb");
const database = require("../config/database");

async function connectToDatabase() {
  const client = new MongoClient(database.uri);
  await client.connect();
  return client.db("bot-pedidos");
}

module.exports = { connectToDatabase };
