const { sendGreetingMessage } = require("../services/sendGreetingMessage");
const { searchOrderInMongoDB } = require("../services/searchOrderInMongoDB");

let isFirstMessage = true;

async function processIncomingMessage(req, res) {
  const userMessage = req.body.Body ? req.body.Body.trim() : "";

  // if (isFirstMessage) {
  //   isFirstMessage = false;
  //   await sendGreetingMessage(res);
  //   return;
  // }

  if (userMessage.toLowerCase() === "oi") {
    sendGreetingMessage(res);
  } else {
    await searchOrderInMongoDB(req, res, userMessage);
  }
}

module.exports = { processIncomingMessage };
