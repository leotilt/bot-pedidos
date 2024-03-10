// mongoauthDB.js
const { MongoClient, ServerApiVersion } = require("mongodb");

// Defina o nome do banco de dados que você deseja usar
const dbName = "Cluster0";

// Construa a string de conexão usando as constantes
const uri = `mongodb+srv://leonardodevdias:KmohLBJyQ7ztzN0N@cluster0.tb6fbpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {
  uri,
  dbName,
  run,
};
