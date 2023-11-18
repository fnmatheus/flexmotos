const express = require('express');
const { addController, getAllController } = require('../controller/vehicles.controller');
const { checkToken } = require('../middlewares/tokenChecker');
const { vehicleAddChecker } = require('../middlewares/vehiclesChecker')

const vehiclesRoutes = express.Router();

vehiclesRoutes.post('/add', checkToken, vehicleAddChecker, addController);
vehiclesRoutes.get('/', checkToken, getAllController);

module.exports = vehiclesRoutes;