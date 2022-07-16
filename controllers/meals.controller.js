//model
const { Restaurant } = require('../models/restaurant.model');
const { Meal} = require('../models/meal.model');


//utils
const { catchAsync } = require('../utils/catchAsync.util');

const  { AppError }  =  require ( '../utils/appError.util' ) ;

//Obtener todas las comidas con status active
const getAllMeals = catchAsync(async (req, res, next) => {
  const MealsRecord = await Meal.findAll({
    where: { status: 'active' },
    include: [{ model: Restaurant,where: { status: 'active' },required: false,attributes: ['name', 'address'],},],
  });

  res.status(200).json({
    status: 'success',
    MealsRecord,
  });
});

//Obtener por id una comida con status active
const getMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  const description = await Meal.findOne({
    where: { id: meal.id, status: 'active' },
    include: [{
        model: Restaurant,
        where: { status: 'active' },
        required: false,
        attributes: ['name', 'address'],
      },
    ],
  });


  if (!description) {
    return new AppError('cannot check food id', 400);
  }

  res.status(200).json({
    status: 'success',
    description,
  });
});



//Crear una nueva comida en el restaurant, siendo :id el id del restaurant (enviar name, price (INT) en req.body)
const createNewMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { restaurant } = req;
  
  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id,
  });

  res.status(200).json({
    status: 'success',
    newMeal,
  });
});


//Actualizar comida (name, price)
const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({
    name,
    price,
  });

  res.status(201).json({status: 'success'});
});

//Deshabilitar comida
const disableMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({
    status: 'deleted',
  });

  res.status(201).json({
    status: 'success',
  });
});

module.exports = {
  createNewMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  disableMeal,
};
