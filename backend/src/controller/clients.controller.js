const {
  add,
  remove,
  update, getAll,
  getDatails,
  getByStatus,
  getByName,
  downloadProof,
  getSecurities,
  addSecuritie,
  removeSecuritie,
} = require('../services/clients.service');

async function addController(req, res) {
  const {name, birth, CPF, CNH, phone, address} = req.body;
  const file = req.file.path;
  const {type, message} = await add({name, birth, CPF, CNH, phone, address, file});
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function removeController(req, res) {
  const {CPF} = req.body;
  const {type, message} = await remove(CPF);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function updateController(req, res) {
  const {name, birth, CPF, CNH, phone, address} = req.body;
  let file = '';
  if (req.file) file = req.file.path;
  const {type, message} = await update({name, birth, CPF, CNH, phone, address, file});
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getAllController(_req, res) {
  const {type, message} = await getAll();
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getDatailsController(req, res) {
  const {CPF} = req.body;
  const {type, message} = await getDatails(CPF);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getByStatusController(req, res) {
  const {status} = req.body;
  const {type, message} = await getByStatus(status);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getByNameController(req, res) {
  const {name} = req.body;
  const {type, message} = await getByName(name);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function downloadProofController(req, res) {
  const {CPF} = req.body;
  const {type, message} = await downloadProof(CPF);
  if (type) return res.status(500).json(message);
  return res.download(message);
}

async function getSecuritiesController(_req, res) {
  const {type, message} = await getSecurities();
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function addSecuritieController(req, res) {
  const {CPF, securitie} = req.body;
  const {type, message} = await addSecuritie({CPF, securitie});
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function removeSecuritieController(req, res) {
  const {CPF, plate} = req.body;
  const {type, message} = await removeSecuritie({CPF, plate});
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
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
  addSecuritieController,
  removeSecuritieController,
};