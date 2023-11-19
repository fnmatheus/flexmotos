const express = require('express');
const {
  addController,
  getAllController,
  getByStatusController,
  getByModelController,
  getAllIPVAsToPayController,
  getAllOilChangeController,
} = require('../controller/vehicles.controller');
const { checkToken } = require('../middlewares/tokenChecker');
const { vehicleAddChecker, vehicleStatusChecker, vehicleModelChecker } = require('../middlewares/vehiclesChecker')

const vehiclesRoutes = express.Router();

vehiclesRoutes.post('/add', checkToken, vehicleAddChecker, addController);
vehiclesRoutes.get('/', checkToken, getAllController);
vehiclesRoutes.get('/status', checkToken, vehicleStatusChecker, getByStatusController);
vehiclesRoutes.get('/model', checkToken, vehicleModelChecker, getByModelController);
vehiclesRoutes.get('/IPVA', checkToken, getAllIPVAsToPayController);
vehiclesRoutes.get('/oil', checkToken, getAllOilChangeController);

module.exports = vehiclesRoutes;