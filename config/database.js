// database.js
const { run } = require("./mongoAuthDB");

(module.exports = {
  accountSid: "AC2f6509d080e22ed45ba3b14c83f0e30c",
  authToken: "a53d1540ca71c107af4ba6ae61c53b00",
  twilioPhoneNumber: "+14155238886",
}),
  // Inicializa a conexão no momento da importação
  run().catch(console.dir);
