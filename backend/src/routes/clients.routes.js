const express = require('express');
const { addClientController } = require('../controller/clients.controller');
const upload = require('../config/multer');

const clientsRoutes = express.Router();

clientsRoutes.post('/add', upload.single('file'), addClientController);

module.exports = clientsRoutes;