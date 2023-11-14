const express = require('express');
const { SignUpController } = require('../controller/users.controller');
const UsersChecker = require('../middlewares/userChecker');

const UsersRoutes = express.Router();

UsersRoutes.post('/signup', UsersChecker, SignUpController)

module.exports = UsersRoutes;