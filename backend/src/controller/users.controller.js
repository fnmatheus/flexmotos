const { signUp, signIn, remove, getAll, update, getByCategory, getByName } = require('../services/users.service');

async function signUpController(req, res) {
  const {name, password, category} = req.body;
  const {type, message} = await signUp({name, password, category});
  if (type === 'NoSuper') return res.status(409).json(message);
  if (type) return res.status(500).json(message);
  return res.status(201).json(message);
}

async function signInController(req, res) {
  const {code, name, password} = req.body;
  const {type , message} = await signIn({code, name, password});
  if (type === 'super') return res.status(401).json(message);
  if (type === 'notFound') return res.status(404).json(message);
  if (type === 'LoginError') return res.status(409).json(message);
  if (type === 'SystemCreated') return res.status(201).json(message);
  if (type === 'SystemError') return res.status(500).json(message);
  return res.status(200).json(message);
}

async function removeController(req, res) {
  const {name} = req.query;
  const {type, message} = await remove(name);
  if (type) return res.status(401).json(message);
  return res.status(200).json(message);
}

async function getAllController(_req, res) {
  const {type, message} = await getAll();
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function updateCotroller(req, res) {
  const {name, password, category} = req.body;
  const {type, message} = await update({name, password, category});
  if (type === 'notFound') return res.status(404).json(message);
  if (type === 'super') return res.status(401).json(message);
  if (type === 'UpdateError') return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getByCategoryController(req, res) {
  const { category } = req.params;
  const {type, message} = await getByCategory(category);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getByNameController(req, res) {
  const { name } = req.params;
  const {type, message} = await getByName(name);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

module.exports = {
  signUpController,
  signInController,
  removeController,
  getAllController,
  updateCotroller,
  getByCategoryController,
  getByNameController
};