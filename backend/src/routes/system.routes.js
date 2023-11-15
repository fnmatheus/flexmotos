const express = require('express');
const { changeTodayController, setGoalController } = require('../controller/system.controller');
const { checkRole, checkToken } = require('../middlewares/tokenChecker');
const { valueParamChecker } = require('../middlewares/systemChecker');

const systemRoutes = express.Router();

systemRoutes.post('/today', checkToken, valueParamChecker, changeTodayController);
systemRoutes.post('/goal', checkRole, valueParamChecker, setGoalController);

module.exports = systemRoutes;