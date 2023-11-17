const express = require('express');
const { addController, removeController } = require('../controller/clients.controller');
const { clientValuesChecker, clientRemoveChecker } = require('../middlewares/clientsChecker');
const { checkToken } = require('../middlewares/tokenChecker');
const upload = require('../config/multer');

const clientsRoutes = express.Router();

clientsRoutes.post('/add', upload.single('file'), checkToken, clientValuesChecker, addController);
clientsRoutes.delete('/remove', checkToken, clientRemoveChecker, removeController)

module.exports = clientsRoutes;