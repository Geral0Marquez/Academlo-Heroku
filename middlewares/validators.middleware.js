const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util');



const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};


const createUserValidators = [
	body('username').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	checkResult,
];

const createMealsValidators = [
	body('name').notEmpty().withMessage('This field cannot be empty'),
	body('price')
	  .notEmpty()
	  .withMessage('This field cannot be empty')
	  .isNumeric()
	  .withMessage('This field must containt a number'),
  ];


const createOrderValidators = [
	body('mealId')
	  .notEmpty()
	  .withMessage('This field cannot be empty')
	  .isNumeric()
	  .withMessage('This field must containt a number'),
	body('quantity')
	  .notEmpty()
	  .withMessage('This field cannot be empty')
	  .isNumeric()
	  .withMessage('This field must containt a number'),
	checkResult,
];
  

const createRestaurantValidators = [
	body('name').notEmpty().withMessage('This field cannot be empty'),
	body('address').notEmpty().withMessage('This field cannot be empty'),
	body('rating')
	  .notEmpty()
	  .withMessage('This field cannot be empty')
	  .isNumeric()
	  .withMessage('This field must containt a number'),
];
  
  

  module.exports = {
	createUserValidators,
	createMealsValidators,
	createRestaurantValidators,
	createOrderValidators,
  };
  