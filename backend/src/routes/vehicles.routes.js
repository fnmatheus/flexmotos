const express = require('express');
const {
  addController,
  getAllController,
  getByStatusController,
  getByModelController,
  removeController,
  updateController,
  getVehicleDetailController,
  getAllIPVAsToPayController,
  IPVAUpdateController,
  getAllOilChangeController,
  oilUpdateController,
  getAllVehiclesToBeReturnedController,
  rentVehicleController,
} = require('../controller/vehicles.controller');
const { checkToken } = require('../middlewares/tokenChecker');
const {
  vehicleAddChecker,
  vehicleStatusChecker,
  vehicleModelChecker,
  vehiclePlateChecker,
  vehicleUpdateChecker,
  rentVehicleChecker,
} = require('../middlewares/vehiclesChecker')

const vehiclesRoutes = express.Router();

vehiclesRoutes.post('/add', checkToken, vehicleAddChecker, addController);
vehiclesRoutes.get('/', checkToken, getAllController);
vehiclesRoutes.get('/status', checkToken, vehicleStatusChecker, getByStatusController);
vehiclesRoutes.get('/model', checkToken, vehicleModelChecker, getByModelController);
vehiclesRoutes.delete('/remove', checkToken, vehiclePlateChecker, removeController);
vehiclesRoutes.post('/update', checkToken, vehicleUpdateChecker, updateController);
vehiclesRoutes.get('/vehicle', checkToken, vehiclePlateChecker, getVehicleDetailController);
vehiclesRoutes.get('/IPVA', checkToken, getAllIPVAsToPayController);
vehiclesRoutes.post('/IPVA', checkToken, vehiclePlateChecker, IPVAUpdateController);
vehiclesRoutes.get('/oil', checkToken, getAllOilChangeController);
vehiclesRoutes.post('/oil', checkToken, vehiclePlateChecker, oilUpdateController);
vehiclesRoutes.get('/return', checkToken, getAllVehiclesToBeReturnedController);
vehiclesRoutes.post('/rent', checkToken, rentVehicleChecker, rentVehicleController);

module.exports = vehiclesRoutes;