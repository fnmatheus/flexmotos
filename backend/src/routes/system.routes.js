const express = require('express');
const {
  changeTodayController,
  setGoalController,
  getDashboardController,
  getYearBillingController,
  setTrafficTicketValueController,
  setFuelValueController,
  setCleanValueController
} = require('../controller/system.controller');
const { checkRole, checkToken } = require('../middlewares/tokenChecker');
const { valueParamChecker } = require('../middlewares/systemChecker');

const systemRoutes = express.Router();

systemRoutes.post('/today', checkToken, valueParamChecker, changeTodayController);
systemRoutes.post('/goal', checkRole, valueParamChecker, setGoalController);
systemRoutes.post('/traffic_ticket', checkRole, valueParamChecker, setTrafficTicketValueController);
systemRoutes.post('/fuel', checkRole, valueParamChecker, setFuelValueController);
systemRoutes.post('/clean', checkRole, valueParamChecker, setCleanValueController);
systemRoutes.get('/dashboard', checkRole, getDashboardController);
systemRoutes.get('/billing', checkRole, getYearBillingController);

module.exports = systemRoutes;