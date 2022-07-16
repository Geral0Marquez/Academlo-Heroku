const express = require('express');

const usersRouter = express.Router();

//middlewares
const {createUserValidators,} = require('../middlewares/validators.middleware');
const {protectSession,protectUserAccount,} = require('../middlewares/auth.middleware');
const { userExist } = require('../middlewares/users.middleware');

//controllers
const {
  createUser,
  login,
  updateUser,
  disableUser,
  getAllOrdersByUser,
  getOrderById,
} = require('../controllers/users.controller');

//routes
usersRouter.post('/signup', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/orders',getAllOrdersByUser);

usersRouter.get('/orders/:id', getOrderById);

usersRouter
  .use('/:id', userExist)
  .route('/:id')
  .patch(protectUserAccount, updateUser)
  .delete(protectUserAccount,disableUser);

module.exports = { usersRouter };
