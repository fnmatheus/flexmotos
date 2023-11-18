const express = require('express');
const { addController } = require('../controller/vehicles.controller');
const { checkToken } = require('../middlewares/tokenChecker');
const { vehicleAddChecker } = require('../middlewares/vehiclesChecker')

const vehiclesRoutes = express.Router();

vehiclesRoutes.post('/add', checkToken, vehicleAddChecker, addController);

module.exports = vehiclesRoutes;