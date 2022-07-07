const express = require('express');


//controllers
const {
  getAllUsers,
  createUser,
  updateUser,
  disableUser,
  login,
} = require('../controllers/users.controller');


//Middlewares
const {
	createUserValidators,
} = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const {
  protectSession,
  protectUserAccount,
} = require('../middlewares/auth.middleware');

//Routers
const usersRouter = express.Router();

usersRouter.post('/signup',	createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter
  .use('/:id', userExists)
  .route('/:id')
  .patch(protectUserAccount, updateUser) 
  .delete(protectUserAccount,  disableUser);

module.exports = { usersRouter };