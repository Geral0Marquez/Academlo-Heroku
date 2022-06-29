const express = require('express');

// Controllers
const {
	getAllUsers,
	createUser,
	updateUser,
	disableUser,
} = require('../controllers/users.controller');

// Middlewares
const {
	createUserValidators,
} = require('../middlewares/userValidators.middleware');
const { userExists } = require('../middlewares/users.middleware');

// router
const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUserValidators, createUser);

usersRouter.patch('/:id', userExists, updateUser);

usersRouter.delete('/:id', userExists, disableUser);

module.exports = { usersRouter};