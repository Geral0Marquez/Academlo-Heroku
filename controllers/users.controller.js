
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//proyect

dotenv.config({ path: './config.env' });

//models
const { Restaurant } = require('../models/restaurant.model');
const { Meal} = require('../models/meal.model');
const { User } = require('../models/user.model');
const { Order } = require('../models/order.model');

//utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');



//Obtener todas las ordenes hechas por el usuario
// inf. restaurant
const getAllOrdersByUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const ordersUser = await Order.findAll({
    where: { userId: sessionUser.id },
    attributes: ['id', 'mealId', 'totalPrice', 'quantity', 'status'],
    include: [
      {
        model: Meal,
        attributes: ['name', 'price'],
        include: [
          { model: Restaurant, attributes: ['name', 'address', 'rating'] },
        ],
      },
    ],
  });

  if (!ordersUser) {
    return new AppError('It has not placed any orders', 400);
  }

  res.status(200).json({
    status: 'success',
    ordersUser,
  });
});

//Obtener detalles de una sola orden dado un ID
const getOrderById = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;
  const orders = await Order.findAll({
    where: { id, userId: sessionUser.id },
    order: [['id', 'ASC']],
  });

  if (!orders) {
    return new AppError('THERE WAS A PROBLEM WITH THE ID REQUEST', 400);
  }

  res.status(200).json({
    status: 'success',
    orders,
  });
});

//Crear usuario (enviar username, email, y password 
const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, rol } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    name: username,
    email,
    password: hashPassword,
    rol,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    newUser,
  });
});

//Iniciar sesión (enviar email y password por req.body)
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: 'active' } });

  if (!user) {
    return new AppError('Credentials invalid', 400);
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return new AppError('Credentials invalid', 400);
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '5d',
  });

  res.status(200).json({
    status: 'success',
    token,
  });
});

//Actualizar perfil de usuario (solo name y email)
const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { username, email } = req.body;

  await user.update({ name: username, email });
  res.status(201).json({ status: 'success' });
});

//Deshabilitar cuenta de usuario
const disableUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(204).json({
    status: 'success',
  });
});





module.exports = {
  createUser,
  login,
  updateUser,
  disableUser,
  getAllOrdersByUser,
  getOrderById,
};