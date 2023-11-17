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

async function update({name, birth, CPF, CNH, phone, address, file: proof}) {
  try {
    const client = await Client.findOne({ CPF });
    if (!client) return { type: 'notFound', message: 'Client not found' };
    if (proof) fs.unlinkSync(client.proof);
    await Client.findOneAndUpdate({ CPF }, {
      name: (!name) ? client.name : name,
      birth: (!birth) ? client.birth : birth,
      CPF: (!CPF) ? client.CPF : CPF,
      CNH: (!CNH) ? client.CNH : CNH,
      phone: (!phone) ? client.phone : phone,
      address: (!address) ? client.address : address,
      proof: (!proof) ? client.proof : proof,
    });
    return { type: null, message: 'update' };
  } catch (error) {
    return { type: 'UpdateClientError', message: `Can't update this client` };
  }
}

async function getAll() {
  try {
    const clients = await Client.find({}, '-birth -CNH -phone -adress -proof -securities');
    const clientsInfo = clients.map((client) =>{
      const lastCar = client.history[client.history.length - 1];
      return {
      name: client.name,
      CPF: client.CPF,
      status: client.status,
      lastCar: (!lastCar) ? '' : lastCar,
    }});
    return { type: null, message: clientsInfo };
  } catch (error) {
    return { type: 'GetClientError', message: `Can't get clients` };
  }
}

module.exports = { add, remove, update, getAll };