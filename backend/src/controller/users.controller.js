const { signUpService, signInService, removeService, getAllService, updateService } = require('../services/users.service');

async function signUpController(req, res) {
  const {name, password, category} = req.body;
  const {type, message} = await signUpService({name, password, category});
  if (type) return res.status(409).json(message);
  return res.status(201).json(message);
}

async function signInController(req, res) {
  const {code, name, password} = req.body;
  const {type , message} = await signInService({code, name, password});
  if (type === 'super') return res.status(401).json(message);
  if (type === 'notFound') return res.status(404).json(message);
  if (type === 'LoginError') return res.status(409).json(message);
  if (type === 'SystemCreated') return res.status(201).json(message);
  if (type === 'SystemError') return res.status(500).json(message);
  return res.status(200).json(message);
}

async function removeController(req, res) {
  const {name} = req.body;
  const {type, message} = await removeService(name);
  if (type) return res.status(401).json(message);
  return res.status(200).json(message);
}

async function getAllController(_req, res) {
  const {type, message} = await getAllService();
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function updateCotroller(req, res) {
  const {name, password, category} = req.body;
  const {type, message} = await updateService({name, password, category});
  if (type === 'notFound') return res.status(404).json(message);
  if (type === 'super') return res.status(401).json(message);
  if (type === 'UpdateError') return res.status(500).json(message);
  return res.status(200).json(message);
}

module.exports = { signUpController, signInController, removeController, getAllController, updateCotroller };