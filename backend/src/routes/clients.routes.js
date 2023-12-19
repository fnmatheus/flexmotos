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
  removeSecuritieController,
  downloadContractController,
} = require('../controller/clients.controller');
const {
  clientAddChecker,
  clientBodyCPFChecker,
  clientCPFChecker,
  clientStatusChecker,
  clientNameChecker,
  removeSecuritieChecker,
} = require('../middlewares/clientsChecker');
const upload = require('../config/multer');

const clientsRoutes = express.Router();

clientsRoutes.post('/add', upload.single('file'), clientAddChecker, addController);
clientsRoutes.delete('/remove', clientCPFChecker, removeController);
clientsRoutes.post('/update', upload.single('file'), clientBodyCPFChecker, updateController);
clientsRoutes.get('/', getAllController);
clientsRoutes.get('/client', clientCPFChecker, getDatailsController);
clientsRoutes.get('/status', clientStatusChecker, getByStatusController);
clientsRoutes.get('/name', clientNameChecker, getByNameController);
clientsRoutes.get('/download', clientCPFChecker, downloadProofController);
clientsRoutes.get('/securities', getSecuritiesController);
clientsRoutes.delete('/securities', removeSecuritieChecker, removeSecuritieController);
clientsRoutes.get('/contract', clientCPFChecker, downloadContractController);

module.exports = clientsRoutes;