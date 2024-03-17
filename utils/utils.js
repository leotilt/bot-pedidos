function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function hideCPF(cpf) {
  return cpf.substring(0, 5) + "XXXXX";
}

function isValidCPF(cpf) {
  // Remover caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  // Verificar se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verificar se todos os dígitos são iguais, o que não é permitido
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Calcular os dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let checkDigit1 = 11 - (sum % 11);
  if (checkDigit1 >= 10) {
    checkDigit1 = 0;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let checkDigit2 = 11 - (sum % 11);
  if (checkDigit2 >= 10) {
    checkDigit2 = 0;
  }

  // Verificar se os dígitos verificadores estão corretos
  if (
    parseInt(cpf.charAt(9)) === checkDigit1 &&
    parseInt(cpf.charAt(10)) === checkDigit2
  ) {
    return true;
  } else {
    return false;
  }
}

module.exports = { formatDate, hideCPF, isValidCPF };
