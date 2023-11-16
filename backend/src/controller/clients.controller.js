const { addClient } = require('../services/clients.service');

async function addClientController(req, res) {
  const {name, birth, CPF, CNH, phone, address} = req.body;
  const file = req.file.path;
  const {type, message} = await addClient({name, birth, CPF, CNH, phone, address, file});
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

module.exports = { addClientController }