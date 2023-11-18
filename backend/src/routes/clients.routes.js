const express = require('express');
const {
  addController,
  removeController,
  updateController,
  getAllController,
  getDatailsController,
  getByStatusController,
} = require('../controller/clients.controller');
const { clientAddChecker, clientCPFChecker, clientStatusChecker } = require('../middlewares/clientsChecker');
const { checkToken } = require('../middlewares/tokenChecker');
const upload = require('../config/multer');

const clientsRoutes = express.Router();

clientsRoutes.post('/add', upload.single('file'), checkToken, clientAddChecker, addController);
clientsRoutes.delete('/remove', checkToken, clientCPFChecker, removeController);
clientsRoutes.post('/update', upload.single('file'), checkToken, clientCPFChecker, updateController);
clientsRoutes.get('/', checkToken, getAllController);
clientsRoutes.get('/client', checkToken, clientCPFChecker, getDatailsController);
clientsRoutes.get('/status', checkToken, clientStatusChecker, getByStatusController);

module.exports = clientsRoutes;