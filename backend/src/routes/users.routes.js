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
const { checkUserRole, checkToken } = require('../middlewares/tokenChecker');

const usersRoutes = express.Router();

usersRoutes.post('/signup', signUpChecker, signUpController);
usersRoutes.post('/signin', signInChecker, signInController);
usersRoutes.delete('/remove', checkUserRole, removeController);
usersRoutes.post('/update', checkUserRole, updateChecker, updateCotroller);
usersRoutes.get('/', checkToken, getAllController);
usersRoutes.get('/category/:category', checkToken, getByCategoryController);
usersRoutes.get('/name/:name', checkToken, getByNameController);

module.exports = usersRoutes;