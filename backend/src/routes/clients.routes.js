const express = require('express');
const {
  addController,
  removeController,
  updateController,
  getAllController,
  getDatailsController,
  getByStatusController,
  getByNameController,
  downloadProofController,
  getSecuritiesController,
  addSecuritieController,
} = require('../controller/clients.controller');
const {
  clientAddChecker,
  clientCPFChecker,
  clientStatusChecker,
  clientNameChecker,
  addSecuritieChecker,
} = require('../middlewares/clientsChecker');
const { checkToken } = require('../middlewares/tokenChecker');
const upload = require('../config/multer');

const clientsRoutes = express.Router();

clientsRoutes.post('/add', upload.single('file'), checkToken, clientAddChecker, addController);
clientsRoutes.delete('/remove', checkToken, clientCPFChecker, removeController);
clientsRoutes.post('/update', upload.single('file'), checkToken, clientCPFChecker, updateController);
clientsRoutes.get('/', checkToken, getAllController);
clientsRoutes.get('/client', checkToken, clientCPFChecker, getDatailsController);
clientsRoutes.get('/status', checkToken, clientStatusChecker, getByStatusController);
clientsRoutes.get('/name', checkToken, clientNameChecker, getByNameController);
clientsRoutes.get('/download', checkToken, clientCPFChecker, downloadProofController);
clientsRoutes.get('/securities', checkToken, getSecuritiesController);
clientsRoutes.post('/securities/add', checkToken, addSecuritieChecker, addSecuritieController);

module.exports = clientsRoutes;