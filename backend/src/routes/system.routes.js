const express = require('express');
const { changeTodayController } = require('../controller/system.controller');
const { checkUserRole, checkToken } = require('../middlewares/tokenChecker');
const { changeTodayChecker } = require('../middlewares/systemChecker');

const systemRoutes = express.Router();

systemRoutes.post('/today', checkToken, changeTodayChecker, changeTodayController);

module.exports = systemRoutes;