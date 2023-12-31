const Client = require('../database/schemas/Client');
const fs = require('fs')

async function add({name, birth, CPF, CNH, phone, address, file: proof, nationality, maritalStatus, job, RG}) {
  try {
    await Client.create({
      name,
      birth,
      CPF,
      CNH,
      phone,
      address,
      proof,
      nationality,
      maritalStatus,
      job,
      RG,
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

async function update({name, birth, CPF, CNH, phone, address, file: proof, nationality, maritalStatus, job, RG}) {
  try {
    console.log({name, birth, CPF, CNH, phone, address, file: proof, nationality, maritalStatus, job, RG})
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
      nationality: (!nationality) ? client.nationality : nationality,
      maritalStatus: (!maritalStatus) ? client.proof : maritalStatus,
      job: (!job) ? client.job : job,
      RG: (!RG) ? client.RG : RG,
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
      const lastVehicle = client.history[client.history.length - 1];
      return {
      name: client.name,
      CPF: client.CPF,
      status: client.status,
      lastVehicle: (!lastVehicle) ? '' : lastVehicle,
    }});
    return { type: null, message: clientsInfo };
  } catch (error) {
    return { type: 'GetClientError', message: `Can't get clients` };
  }
}

async function getDatails(CPF) {
  try {
    const client = await Client.findOne({ CPF }, '-proof');
    if (!client) return { type: 'notFound', message: 'Client not found' };
    return { type: null, message: client };
  } catch (error) {
    return { type: 'GetClientError', message: `Can't get clients` };
  }
}

async function getByStatus(status) {
  try {
    const clients = await Client.find({status}, '-birth -CNH -phone -adress -proof -securities');
    const clientsInfo = clients.map((client) =>{
      const lastVehicle = client.history[client.history.length - 1];
      return {
      name: client.name,
      CPF: client.CPF,
      status: client.status,
      lastVehicle: (!lastVehicle) ? '' : lastVehicle,
    }});
    return { type: null, message: clientsInfo };
  } catch (error) {
    return { type: 'GetClientError', message: `Can't get clients` };
  }
}

async function getByName(name) {
  try {
    const clients = await Client.find({name: { "$regex": name, "$options": "i" }}, '-birth -CNH -phone -adress -proof -securities');
    const clientsInfo = clients.map((client) =>{
      const lastVehicle = client.history[client.history.length - 1];
      return {
      name: client.name,
      CPF: client.CPF,
      status: client.status,
      lastVehicle: (!lastVehicle) ? '' : lastVehicle,
    }});
    return { type: null, message: clientsInfo };
  } catch (error) {
    return { type: 'GetClientError', message: `Can't get clients` };
  }
}

async function downloadProof(CPF) {
  try {
    const client = await Client.findOne({ CPF }, 'proof');
    if (!client) return { type: 'notFound', message: 'Client not found' };
    return { type: null, message: client.proof };
  } catch (error) {
    return { type: 'GetClientError', message: `Can't get clients` };
  }
}

async function getSecurities() {
  try {
    const clients = await Client.find({}, 'name securities CPF');
    if (!clients) return { type: 'notFound', message: 'Client not found' };
    const onlyHasSecurities = clients.filter((client) => client.securities.length > 0);
    return { type: null, message: onlyHasSecurities };
  } catch (error) {
    return { type: 'GetClientError', message: `Can't get clients` };
  }
}

async function removeSecuritie({CPF, plate}) {
  try {
    const client = await Client.findOne({ CPF }, '-proof');
    if (!client) return { type: 'notFound', message: 'Client not found' };
    const findSecurite = client.securities.filter((item) => item.includes(plate));
    if (findSecurite.length === 0) return { type: 'notFound', message: 'Securitie not found' };
    await Client.findOneAndUpdate({CPF}, {
      securities: client.securities.filter((item) => !item.includes(plate)),
    });
    return { type: null, message: 'Securitie removed' };
  } catch (error) {
    return { type: 'GetClientError', message: `Can't get clients` };
  }
}

async function updateClientToRent({CPF, model, plate, rentalDate, securityValue, hasSecurity}) {
  const client = await Client.findOne({ CPF });
  await Client.findOneAndUpdate({ CPF }, {
    status: true,
    history: [
      ...client.history,
      [model, plate, rentalDate],
    ],
    securities: (!hasSecurity) ? [...client.securities] : [
      ...client.securities,
      [plate, securityValue],
    ],
  });
  console.log('Client has been updated');
}

async function updateClientToReturn(CPF) {
  await Client.findOneAndUpdate({ CPF }, { status: false });
  console.log('Client has been updated');
}

async function addContract(CPF, path) {
  const client = await Client.findOne({ CPF });
  await Client.findOneAndUpdate({ CPF }, {
    contracts: [...client.contracts, path],
  });
}

async function downloadContract(CPF) {
  try {
    const client = await Client.findOne({ CPF }, 'contracts');
    const contractPath = client.contracts[client.contracts.length - 1].split(' ');
    return { type: null, message: contractPath };
  } catch (error) {
    return { type: 'Download Error', message: 'Contract download error!' }
  }
}

module.exports = {
  add,
  remove,
  update,
  getAll,
  getDatails,
  getByStatus,
  getByName,
  downloadProof,
  getSecurities,
  removeSecuritie,
  updateClientToRent,
  updateClientToReturn,
  addContract,
  downloadContract,
};