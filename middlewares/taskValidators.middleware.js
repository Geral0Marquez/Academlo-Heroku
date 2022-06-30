// importar tanto el body y validacion que nos arroja el resultado o la respuesta
const { body, validationResult } = require('express-validator');

//utils
const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

// si el error esta vacio es porque esta bien por lo contrario notifica los errores
  if (!errors.isEmpty()) {
    errors.array();
    const errorMsg = errors.array().map((err) => err.msg);
    const message = errorMsg.join('. ');
    return next(new AppError(message, 400));
  }

  next();
};

//fields: Title, userId
const createTaskValidators = [
  body('title').notEmpty().withMessage('title cannot be empty'),
  body('userId').notEmpty().withMessage('userId must be a number'),

  checkResult,
];

module.exports = { createTaskValidators };