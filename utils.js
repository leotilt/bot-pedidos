const add9ToBrazilianPhoneNumber = (phoneNumber) => {
  return isBrazilianPhoneNumber(phoneNumber)
    ? `+9${phoneNumber.replace(/\D/g, "")}`
    : phoneNumber;
};

const isBrazilianPhoneNumber = (phoneNumber) => {
  return phoneNumber.startsWith("+55") && phoneNumber.length === 13;
};

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return "☀️ Bom dia!";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "🌅 Boa tarde!";
  } else {
    return "🌙 Boa noite!";
  }
};

module.exports = {
  getGreeting,
  add9ToBrazilianPhoneNumber,
  isBrazilianPhoneNumber,
};
