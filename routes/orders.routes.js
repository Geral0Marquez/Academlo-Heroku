const express = require('express');

const ordersRouter = express.Router();

//middlewares
const {createOrderValidators,} = require('../middlewares/validators.middleware');
const { protectSession,checkSession } = require('../middlewares/auth.middleware');
const { mealExist } = require('../middlewares/meals.middleware');
const { orderExist } = require('../middlewares/orders.middleware');
const {restaurantExist,} = require('../middlewares/restaurants.middleware');


//controllers
const {
  createNewOrder,
  getAllOrders,
  MarkOrderbyId,
  OrderCanceled,
} = require('../controllers/orders.controller');

//routes

ordersRouter.use(protectSession); //protected JWT

ordersRouter.post('/',createOrderValidators, mealExist, restaurantExist,createNewOrder);
ordersRouter.get('/me', getAllOrders);
ordersRouter
  .route('/:id')
  .patch(orderExist, checkSession, MarkOrderbyId)
  .delete(orderExist, checkSession, OrderCanceled);

module.exports = { ordersRouter };
