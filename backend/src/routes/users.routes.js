const express = require('express');
const { 
  signUpController,
  signInController,
  removeController,
  getAllController,
  updateCotroller,
  getByCategoryController,
  getByNameController
} = require('../controller/users.controller');
const { signUpChecker, signInChecker, updateChecker } = require('../middlewares/userChecker');
const { checkRole, checkToken } = require('../middlewares/tokenChecker');

const usersRoutes = express.Router();

usersRoutes.post('/signup', signUpChecker, signUpController);
usersRoutes.post('/signin', signInChecker, signInController);
usersRoutes.delete('/remove', checkRole, removeController);
usersRoutes.post('/update', checkRole, updateChecker, updateCotroller);
usersRoutes.get('/', checkToken, getAllController);
usersRoutes.get('/category/:category', checkToken, getByCategoryController);
usersRoutes.get('/name/:name', checkToken, getByNameController);

module.exports = usersRoutes;