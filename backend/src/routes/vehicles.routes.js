const express = require('express');
const {
  addController,
  getAllController,
  getByStatusController,
  getByModelController,
  getAllIPVAsToPayController,
  IPVAUpdateController,
  getAllOilChangeController,
  oilUpdateController,
} = require('../controller/vehicles.controller');
const { checkToken } = require('../middlewares/tokenChecker');
const { vehicleAddChecker, vehicleStatusChecker, vehicleModelChecker, vehiclePlateChecker } = require('../middlewares/vehiclesChecker')

const vehiclesRoutes = express.Router();

vehiclesRoutes.post('/add', checkToken, vehicleAddChecker, addController);
vehiclesRoutes.get('/', checkToken, getAllController);
vehiclesRoutes.get('/status', checkToken, vehicleStatusChecker, getByStatusController);
vehiclesRoutes.get('/model', checkToken, vehicleModelChecker, getByModelController);
vehiclesRoutes.get('/IPVA', checkToken, getAllIPVAsToPayController);
vehiclesRoutes.post('/IPVA', checkToken, vehiclePlateChecker, IPVAUpdateController);
vehiclesRoutes.get('/oil', checkToken, getAllOilChangeController);
vehiclesRoutes.post('/oil', checkToken, vehiclePlateChecker, oilUpdateController);

module.exports = vehiclesRoutes;