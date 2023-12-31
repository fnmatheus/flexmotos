const express = require('express');
const {
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
} = require('../controller/vehicles.controller');
const {
  vehicleAddChecker,
  vehicleStatusChecker,
  vehicleModelChecker,
  vehiclePlateChecker,
  vehicleBodyPlateChecker,
  vehicleUpdateChecker,
  rentVehicleChecker,
  returnVehicleChecker,
} = require('../middlewares/vehiclesChecker')

const vehiclesRoutes = express.Router();

vehiclesRoutes.post('/add', vehicleAddChecker, addController);
vehiclesRoutes.get('/', getAllController);
vehiclesRoutes.get('/status', vehicleStatusChecker, getByStatusController);
vehiclesRoutes.get('/model', vehicleModelChecker, getByModelController);
vehiclesRoutes.delete('/remove', vehiclePlateChecker, removeController);
vehiclesRoutes.post('/update', vehicleUpdateChecker, updateController);
vehiclesRoutes.get('/vehicle', vehiclePlateChecker, getVehicleDetailsController);
vehiclesRoutes.get('/IPVA', getAllIPVAsToPayController);
vehiclesRoutes.post('/IPVA', vehicleBodyPlateChecker, IPVAUpdateController);
vehiclesRoutes.get('/oil', getAllOilChangeController);
vehiclesRoutes.post('/oil', vehicleBodyPlateChecker, oilUpdateController);
vehiclesRoutes.get('/return', getAllVehiclesToBeReturnedController);
vehiclesRoutes.post('/rent', rentVehicleChecker, rentVehicleController);
vehiclesRoutes.post('/return', returnVehicleChecker, returnVehicleController);

module.exports = vehiclesRoutes;