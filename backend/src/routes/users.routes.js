const express = require('express');
const { signUpController, signInController, removeController, getAllController, updateCotroller, getByCategoryController } = require('../controller/users.controller');
const { signUpChecker, signInChecker, updateChecker } = require('../middlewares/userChecker');
const { checkUserRole, checkToken } = require('../middlewares/tokenChecker');

const UsersRoutes = express.Router();

UsersRoutes.post('/signup', signUpChecker, signUpController);
UsersRoutes.post('/signin', signInChecker, signInController);
UsersRoutes.delete('/remove', checkUserRole, removeController);
UsersRoutes.post('/update', checkUserRole, updateChecker, updateCotroller);
UsersRoutes.get('/', checkToken, getAllController);
UsersRoutes.get('/:category', checkToken, getByCategoryController);

module.exports = UsersRoutes;