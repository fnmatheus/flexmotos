const express = require('express');
const { addClientController } = require('../controller/clients.controller');
const { clientValuesChecker } = require('../middlewares/clientsChecker');
const upload = require('../config/multer');

const clientsRoutes = express.Router();

clientsRoutes.post('/add', upload.single('file'), clientValuesChecker, addClientController);

module.exports = clientsRoutes;