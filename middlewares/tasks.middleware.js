// Models
const { Task } = require('../models/task.model');

//Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const taskExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id } });

  if (!task) {
    return next(new AppError('task not found', 404));
  }

  req.task = task;

  next();
});

module.exports = { taskExists };

