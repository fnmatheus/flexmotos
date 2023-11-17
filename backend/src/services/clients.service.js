const Client = require('../database/schemas/Client');
const fs = require('fs')

async function add({name, birth, CPF, CNH, phone, address, file: proof}) {
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

async function remove(CPF) {
  try {
    const client = await Client.findOne({ CPF });
    if (!client) return { type: 'notFound', message: 'Client not found' };
    fs.unlinkSync(client.proof);
    await Client.deleteOne({ CPF });
    return { type: null, message: 'Client has been removed' };
  } catch (error) {
    return { type: 'RemoveClientError', message: `Can't remove this client` };
  }
}

async function update() {}

module.exports = { add, remove, update };