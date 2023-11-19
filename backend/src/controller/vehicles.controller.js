const {
  add,
  getAll,
  getByStatus,
  getByModel,
  remove,
  getAllIPVAsToPay,
  IPVAUpdate,
  getAllOilChange,
  oilUpdate,
  getAllVehiclesToBeReturned,
} = require('../services/vehicles.service');

async function addController(req, res) {
  const {category, model, year, plate, RENAVAM, IPVA, mileage, securityValue, rentValue} = req.body;
  const {type, message} = await add({category, model, year, plate, RENAVAM, IPVA, mileage, securityValue, rentValue});
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getAllController(_req, res) {
  const {type, message} = await getAll();
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getByStatusController(req, res) {
  const {status} = req.body;
  const {type, message} = await getByStatus(status);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getByModelController(req, res) {
  const {model} = req.body;
  const {type, message} = await getByModel(model);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function removeController(req, res) {
  const {plate} = req.body;
  const {type, message} = await remove(plate);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getAllIPVAsToPayController(_req, res) {
  const {type, message} = await getAllIPVAsToPay();
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function IPVAUpdateController(req, res) {
  const {plate} = req.body;
  const {type, message} = await IPVAUpdate(plate);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getAllOilChangeController(_req, res) {
  const {type, message} = await getAllOilChange();
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function oilUpdateController(req, res) {
  const {plate} = req.body;
  const {type, message} = await oilUpdate(plate);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getAllVehiclesToBeReturnedController(_req, res) {
  const {type, message} = await getAllVehiclesToBeReturned();
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

module.exports = {
  addController,
  getAllController,
  getByStatusController,
  getByModelController,
  removeController,
  getAllIPVAsToPayController,
  IPVAUpdateController,
  getAllOilChangeController,
  oilUpdateController,
  getAllVehiclesToBeReturnedController,
};