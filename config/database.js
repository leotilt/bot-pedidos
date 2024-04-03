const user = "leonardodevdias";
const password = "KmohLBJyQ7ztzN0N";

require("dotenv").config();

module.exports = {
  accountSid: process.env.ACCOUNT_SID,
  authToken: process.env.AUTH_TOKEN,
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
  uri: process.env.MONGODB_URI,
};
