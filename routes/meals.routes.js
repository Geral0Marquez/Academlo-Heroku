const express = require('express');

//middlewares
const {restaurantExist,} = require('../middlewares/restaurants.middleware');
const { mealExist } = require('../middlewares/meals.middleware');
const {protectSession,isAdmin,} = require('../middlewares/auth.middleware');
const {createMealsValidators,} = require('../middlewares/validators.middleware');


const mealsRouter = express.Router();

const {
  createNewMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  disableMeal,
} = require('../controllers/meals.controller');

//routes
mealsRouter.get('/', getAllMeals);
mealsRouter.get('/:id', mealExist, getMealById);

//protected routes

mealsRouter.use(protectSession);
mealsRouter.post('/:id', createMealsValidators,restaurantExist,  createNewMeal);
mealsRouter.patch('/:id', mealExist, isAdmin, updateMeal);
mealsRouter.delete('/:id', mealExist, isAdmin, disableMeal);

module.exports = { mealsRouter };
