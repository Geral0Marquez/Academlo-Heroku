//Models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');
//utils
const { catchAsync } = require('../utils/catchAsync.util');
const  { AppError }  =  require ( '../utils/appError.util' ) ;

//Obtener todos los restaurants con status active
const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurantsRecord = await Restaurant.findAll({
    where: { status: 'active' },
    attributes: ['id','name', 'address', 'rating', 'status'],
    include: [
      {
        model: Review,
        required: false,
        where: { status: 'active' },
        attributes: ['comment', 'rating'],
      },
    ],
  });

  res.status(201).json({
    restaurantsRecord,
  });
});


//Obtener restaurant por id
const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(201).json({
    restaurant,
  });
});


// Crear un nuevo restaurant (enviar name, address, rating (INT))
const createNewRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    newRestaurant,
  });
});


//Actualizar restaurant (name, address)
const updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({
    name,
    address,
  });

  res.status(201).json({ status: 'success'});
});

//Deshabilitar restaurant
const disableRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'delete' });

  res.status(201).json({status: 'success'});
});

//Crear una nueva reseña en el restaurant,siendo :
//restaurantId el id del restaurant (enviar comment,  rating (INT) en req.body)

const createNewReviewRestaurant = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { restaurantId } = req.params;
  const { comment, rating } = req.body;
  
  const reviewRestaurant = await Restaurant.findOne({
    where: { id: restaurantId, status: 'active' },
  });
  if (!reviewRestaurant) {
    return next(
      new AppError('not available', 400)
    );
  }

  const newReview = await Review.create({
    userId: sessionUser.id,
    restaurantId,
    comment,
    rating,
  });

  res.status(201).json({
    status: 'success',
    newReview,
  });
});

//Actualizar una reseña hecha en un restaurant,id el id de la reseña (comment, rating)
const updateReviewRestaurant = catchAsync(async (req, res, next) => {
 
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({
    comment,
    rating,
  });

  res.status(204).json({status: 'success'});
});

//Actualizar una reseña hecha en un restaurant a status deleted,

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({
    status: 'deleted',
  });

  res.status(204).json({status: 'success'});
});

module.exports = {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurantById ,
  updateRestaurant,
  disableRestaurant ,
  createNewReviewRestaurant,
  updateReviewRestaurant,
  deleteReview,
};
