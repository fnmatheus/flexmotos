const express = require('express');
const { SignUpController, SignInController, RemoveController } = require('../controller/users.controller');
const { SignUpChecker, SignInChecker, RemoveChecker } = require('../middlewares/userChecker');

const UsersRoutes = express.Router();

UsersRoutes.post('/signup', SignUpChecker, SignUpController);
UsersRoutes.post('/signin', SignInChecker, SignInController);
UsersRoutes.delete('/delete', RemoveChecker, RemoveController)

module.exports = UsersRoutes;