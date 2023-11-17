const { add, remove, update, getAll, getDatails } = require('../services/clients.service');

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

module.exports = { addController, removeController, updateController, getAllController, getDatailsController };