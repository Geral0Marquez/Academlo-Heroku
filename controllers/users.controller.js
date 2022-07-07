
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

//models
const { User } = require('../models/user.model');

//utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
const { Review } = require('../models/review.model');

//Get Obtener la lista de usuarios cuyas cuentas sigan activas
const getAllUsers = async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' },
    include: [{model: Review}]
  });

  res.status(200).json({
    status: 'success',
    users,
  });
};

// post /signup Crear usuario (username, email, y password por req.body)
//validar los datos 
const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name: username,
    email,
    password: hashPassword,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    newUser,
  });
});

// Patch /:id Actualizar perfil de usuario (solo name y email)
const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const {  username, email } = req.body;

  await user.update({ name: username, email });

  res.status(201).json({status: 'success'});
});

// Delete /:id Deshabilitar cuenta de usuario
const  disableUser = async (req, res, next) => {
  const { user } = req;
  await user.update({ status: 'disabled' });

  res.status(200).json({status: 'success'});
};


// Post inicio de sesion (login) (enviar email y password por req.body)
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  
  // Validate credentials (email)
  const user = await User.findOne(
    { where: 
      { email, 
      status: 'active' 
    } 
  });

  console.log(user)

  if (!user) {
    return next(new AppError('Credentials invalid', 400));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new AppError('Credentials invalid', 400));
  }
  // Generate JWT (JsonWebToken) ->
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '5d',
  });

  res.status(200).json({
    status: 'success',
    token,
  });
});



module.exports = { getAllUsers, createUser, login, updateUser,  disableUser };