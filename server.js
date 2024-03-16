const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Adicionando rotas
app.use("/", routes);

app.listen(port, () => {
  console.log(
    "\x1b[33m[Server.js] Servidor rodando na porta " + port + "\x1b[0m"
  );
});
