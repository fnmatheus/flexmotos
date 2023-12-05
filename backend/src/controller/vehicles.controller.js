const {
  add,
  getAll,
  getByStatus,
  getByModel,
  remove,
  update,
  getVehicleDetails,
  getAllIPVAsToPay,
  IPVAUpdate,
  getAllOilChange,
  oilUpdate,
  getAllVehiclesToBeReturned,
  rentVehicle,
  returnVehicle,
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
  const {status} = req.query;
  const {type, message} = await getByStatus(status === 'true');
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getByModelController(req, res) {
  const {model} = req.query;
  const {type, message} = await getByModel(model);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function removeController(req, res) {
  const {plate} = req.query;
  const {type, message} = await remove(plate);
  if (type === 'notFound') return res.status(404).json(message);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function updateController(req, res) {
  const {model, year, plate, RENAVAM, mileage, securityValue, rentValue} = req.body;
  const {type, message} = await update({model, year, plate, RENAVAM, mileage, securityValue, rentValue});
  if (type === 'notFound') return res.status(404).json(message);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getVehicleDetailsController(req, res) {
  const {plate} = req.query;
  const {type, message} = await getVehicleDetails(plate);
  if (type === 'notFound') return res.status(404).json(message);
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

async function rentVehicleController(req, res) {
  const {CPF, name, rentalDate, returnDate, plate, hasSecurity, rentValue, securityValue} = req.body;
  const {type, message} = await rentVehicle({CPF, name, rentalDate, returnDate, plate, hasSecurity, rentValue, securityValue});
  if (type === 'notFound') return res.status(404).json(message);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function returnVehicleController(req, res) {
  const {CPF, plate} = req.body;
  const {type, message} = await returnVehicle({CPF, plate});
  if (type === 'notFound') return res.status(404).json(message);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

module.exports = {
  addController,
  getAllController,
  getByStatusController,
  getByModelController,
  removeController,
  updateController,
  getVehicleDetailsController,
  getAllIPVAsToPayController,
  IPVAUpdateController,
  getAllOilChangeController,
  oilUpdateController,
  getAllVehiclesToBeReturnedController,
  rentVehicleController,
  returnVehicleController,
};