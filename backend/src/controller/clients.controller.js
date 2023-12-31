const zip = require('express-zip');

const {
  add,
  remove,
  update, getAll,
  getDatails,
  getByStatus,
  getByName,
  downloadProof,
  getSecurities,
  removeSecuritie,
  downloadContract,
} = require('../services/clients.service');

async function addController(req, res) {
  const {name, birth, CPF, CNH, phone, address, nationality, maritalStatus, job, RG} = req.body;
  const file = req.file.path;
  const {type, message} = await add({name, birth, CPF, CNH, phone, address, file, nationality, maritalStatus, job, RG});
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function removeController(req, res) {
  const {CPF} = req.query;
  const {type, message} = await remove(CPF);
  if (type === 'notFound') return res.status(404).json(message);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function updateController(req, res) {
  const {name, birth, CPF, CNH, phone, address, nationality, maritalStatus, job, RG} = req.body;
  let file = '';
  if (req.file) file = req.file.path;
  const {type, message} = await update({name, birth, CPF, CNH, phone, address, file, nationality, maritalStatus, job, RG});
  if (type === 'notFound') return res.status(404).json(message);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getAllController(_req, res) {
  const {type, message} = await getAll();
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getDatailsController(req, res) {
  const {CPF} = req.query;
  const {type, message} = await getDatails(CPF);
  if (type === 'notFound') return res.status(404).json(message);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getByStatusController(req, res) {
  const {status} = req.query;
  const {type, message} = await getByStatus(status === 'true');
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getByNameController(req, res) {
  const {name} = req.query;
  const {type, message} = await getByName(name);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function downloadProofController(req, res) {
  const {CPF} = req.query;
  const {type, message} = await downloadProof(CPF);
  if (type === 'notFound') return res.status(404).json(message);
  if (type) return res.status(500).json(message);
  return res.download(message);
}

async function getSecuritiesController(_req, res) {
  const {type, message} = await getSecurities();
  if (type === 'notFound') return res.status(404).json(message);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function removeSecuritieController(req, res) {
  const {CPF, plate} = req.query;
  const {type, message} = await removeSecuritie({CPF, plate});
  if (type === 'notFound') return res.status(404).json(message);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function downloadContractController(req, res) {
  const {CPF} = req.query;
  const {type, message} = await downloadContract(CPF);
  if (type) return res.status(404).json(message);
  const files = [
    {path : message[0], name : 'contrato.pdf'},
    {path : message[1], name : 'recibo.pdf'},
  ]
  return res.zip(files);
}

module.exports = {
  addController,
  removeController,
  updateController,
  getAllController,
  getDatailsController,
  getByStatusController,
  getByNameController,
  downloadProofController,
  getSecuritiesController,
  removeSecuritieController,
  downloadContractController,
};