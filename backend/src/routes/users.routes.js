const express = require('express');
const { signUpController, signInController, removeController, getAllController } = require('../controller/users.controller');
const { SignUpChecker, SignInChecker } = require('../middlewares/userChecker');
const { checkRoleToDeleteUser, checkToken } = require('../middlewares/tokenChecker');

const UsersRoutes = express.Router();

UsersRoutes.post('/signup', SignUpChecker, signUpController);
UsersRoutes.post('/signin', SignInChecker, signInController);
UsersRoutes.delete('/remove', checkRoleToDeleteUser, removeController);
UsersRoutes.get('/', checkToken, getAllController);

module.exports = UsersRoutes;