//Models
const { Meal} = require('../models/meal.model');
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const mealExist = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;
  const { id } = req.params;
 
  const meal = await Meal.findOne({ where: { id: id || mealId } });

  if (!meal) {
    return next(new AppError('Meal not found', 403));
  }

  req.meal = meal;

  next();
});

module.exports = { mealExist };
