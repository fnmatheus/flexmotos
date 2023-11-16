const Client = require('../database/schemas/Client');

async function addClient({name, birth, CPF, CNH, phone, address, file: proof}) {
  try {
    await Client.create({
      name,
      birth,
      CPF,
      CNH,
      phone,
      address,
      proof,
    });
    return { type: null, message: 'Client created' };
  } catch (error) {
    return { type: 'AddClientError', message: `Can't add this client` };
  }
}

module.exports = { addClient }