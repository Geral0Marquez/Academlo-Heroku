// Models
const { User} = require('../models/user.model');

//utils
const { catchAsync } = require('../utils/catchAsync.util');  
// catchAsync nos evitamos reescribir try y catch(no te repitas a ti mismo) en los endpoints (deben ser asincronos) 

//http verb: post, get, patch and delete

// obtener a todos los usuarios
const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({
    status: 'success',
    users,
  });
});

// crear el usuario con "post" teniendo en cuenta sus tres datos(nombre, correo y su contraseña)
// validar los datos con middleware
const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: 'success',
    newUser,
  });
});

// actualizar los datos (name, email) del usuario
const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(204).json({status: 'updated'});
});

// deshabilitar cuenta de usuario
const disableUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const userDeleted = await user.update({ status: 'disabled' });

  res.status(204).json({
    status: 'success',
    userDeleted,
  });
});

module.exports = { 
	getAllUsers,
	createUser,
	updateUser,
	disableUser };





