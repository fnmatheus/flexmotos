const { add, remove } = require('../services/clients.service');

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

module.exports = { addController, removeController }