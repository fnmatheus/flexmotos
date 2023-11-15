const { SignUpService, SignInService, RemoveService } = require('../services/users.service');

async function SignUpController(req, res) {
  const {code, name, password, category} = req.body;
  const {type, message} = await SignUpService({code, name, password, category});
  if (type) return res.status(409).json(message);
  return res.status(201).json(message);
}

async function SignInController(req, res) {
  const {code, name, password} = req.body;
  const {type , message} = await SignInService({code, name, password});
  if(type === 'super') return res.status(401).json(message);
  if(type === 'notFound') return res.status(404).json(message);
  return res.status(200).json(message);
}

async function RemoveController(req, res) {
  const {name} = req.body;
  const {type, message} = await RemoveService(name);
  if (type === 'LoginError') return res.status(409).json(message);
  if (type === 'SystemCreated') return res.satatus(201).json(message);
  if (type === 'SystemError') return res.status(500).json(message);
  if (type) return res.status(401).json(message);
  return res.status(200).json(message);
}

module.exports = { SignUpController, SignInController, RemoveController };