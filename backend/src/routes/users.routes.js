const express = require('express');
const { SignUpController, SignInController, RemoveController } = require('../controller/users.controller');
const { SignUpChecker, SignInChecker, RemoveChecker } = require('../middlewares/userChecker');
const { checkRoleToDeleteUser } = require('../middlewares/tokenChecker');

const UsersRoutes = express.Router();

UsersRoutes.post('/signup', SignUpChecker, SignUpController);
UsersRoutes.post('/signin', SignInChecker, SignInController);
UsersRoutes.delete('/delete', checkRoleToDeleteUser, RemoveController)

module.exports = UsersRoutes;