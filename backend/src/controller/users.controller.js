const { SignUpService } = require('../services/users.service');

async function SignUpController(req, res) {
  const {code, name, password, category} = req.body;
  const { type, message } = await SignUpService({code, name, password, category});
  if (type === 'ok') return res.status(201).json(message);
  if (type === 'used') return res.status(409).json(message);
  return res.status(409).json(type);
}

module.exports = { SignUpController };