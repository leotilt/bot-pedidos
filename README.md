# 🤖 Bot de Pedidos WhatsApp

## 📱 Sobre o Projeto

Este é um bot desenvolvido em Node.js que permite consultar status de pedidos via WhatsApp utilizando a API do Twilio. O bot verifica pedidos através do CPF do cliente e retorna informações detalhadas sobre suas compras.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Twilio
- Body-parser

## ⚙️ Pré-requisitos

- Node.js instalado
- Conta no Twilio
- MongoDB Atlas ou local
- WhatsApp

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://seu-repositorio/bot-pedidos.git
cd bot-pedidos
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente (.env):

```env
ACCOUNT_SID=seu_account_sid_twilio
AUTH_TOKEN=seu_auth_token_twilio
TWILIO_PHONE_NUMBER=seu_numero_twilio
MONGODB_URI=sua_uri_mongodb
```

## 🔧 Configuração do MongoDB

O banco de dados espera documentos com a seguinte estrutura:

```json
{
  "numeroPedido": "123456",
  "nome": "Nome Cliente",
  "cpf": "12345678900",
  "dataCompra": "2024-03-15T12:00:00Z",
  "celulares": [{ "modelo": "iPhone 13" }],
  "status": "Em andamento"
}
```

## 🎯 Funcionalidades

- ✅ Validação de CPF
- 📱 Consulta de múltiplos pedidos
- �� Mascaramento de CPF nas respostas
- 📅 Formatação de datas
- 💬 Mensagens interativas

## 🚀 Como Usar

1. Inicie o servidor:

```bash
npm start
```

2. Envie uma mensagem para o número do WhatsApp configurado
3. Siga as instruções do bot para consultar seus pedidos
4. Insira seu CPF quando solicitado

## 👨‍💻 Desenvolvimento

Para rodar em ambiente de desenvolvimento:

```bash
npm run dev
```

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Se precisar de ajuda ou tiver dúvidas, entre em contato!

---

⌨️ com ❤️ por [Leonardo Dias](https://github.com/leonardodevdias)
