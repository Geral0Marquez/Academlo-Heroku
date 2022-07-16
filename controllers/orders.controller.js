//models
const { Restaurant } = require('../models/restaurant.model');
const { Order } = require('../models/order.model');
const { Meal} = require('../models/meal.model');
//utils
const { catchAsync } = require('../utils/catchAsync.util');
const  { AppError }  =  require ( '../utils/appError.util' ) ;



//Obtener todas las ordenes del usuario
const getAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: { userId: sessionUser.id, status: 'active' },
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

  if (!orders) {
    return new AppError('the request of the orders was not detected', 400);
  }

  res.status(201).json({
    status: 'success',
    orders,
  });
});

//Marcar una orden por id con status completed
const MarkOrderbyId = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(201).json({
    status: 'success'
  });
});

//Crear una nueva order (enviar quantity y mealId por req.body)
const createNewOrder = catchAsync(async (req, res, next) => {
 
  const { mealId, quantity } = req.body;
  const { sessionUser,meal } = req;

  const totalPrice = meal.price * quantity;

  const order = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice,
    quantity,
  });

  res.status(201).json({
    status: 'success',
    order,
  });
});


//Marcar una orden por id con status cancelled
const OrderCanceled = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(201).json({
    status: 'success'
  });
});

module.exports = 
{ getAllOrders, 
  createNewOrder, 
  MarkOrderbyId, 
  OrderCanceled};
