const express = require('express');

const restaurantRouter = express.Router();

//middleware
const {createRestaurantValidators,} = require('../middlewares/validators.middleware');
const {restaurantExist,} = require('../middlewares/restaurants.middleware');
const { reviewExist } = require('../middlewares/reviews.middleware');
const {protectSession,isAdmin,checkSession,} = require('../middlewares/auth.middleware');

//constrollers
const {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurantById ,
  updateRestaurant,
  disableRestaurant,
  createNewReviewRestaurant,
  updateReviewRestaurant,
  deleteReview,
} = require('../controllers/restaurants.controller');


//routes
restaurantRouter.get('/', getAllRestaurants);
restaurantRouter.get('/:id', restaurantExist, getRestaurantById );


restaurantRouter.use(protectSession);

restaurantRouter.post('/', createRestaurantValidators,createNewRestaurant);

restaurantRouter.post('/reviews/:restaurantId', createNewReviewRestaurant);
restaurantRouter.patch(
  '/reviews/:id',
  reviewExist,
  checkSession,
  updateReviewRestaurant
);
restaurantRouter.delete(
  '/reviews/:id',
  reviewExist,
  checkSession,
  deleteReview
);


restaurantRouter
  .use('/:id', restaurantExist)
  .route('/:id')
  .patch( checkSession, updateRestaurant)
  .delete(checkSession, disableRestaurant);

module.exports = { restaurantRouter };
