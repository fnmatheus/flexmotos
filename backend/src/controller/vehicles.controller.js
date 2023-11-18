const { add } = require('../services/vehicles.service');

async function addController(req, res) {
  const {category, model, year, plate, RENAVAM, IPVA, mileage, securityValue, rentValue} = req.body;
  const {type, message} = await add({category, model, year, plate, RENAVAM, IPVA, mileage, securityValue, rentValue});
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

module.exports = { addController };