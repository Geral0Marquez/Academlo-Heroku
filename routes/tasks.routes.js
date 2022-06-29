const express = require('express');


// controllers
const {
  createTask,
  getAllTasks,
  getTasksByStatus,
  updateTaskById,
  cancelTask,
} = require('../controllers/tasks.controller');

// Middlewares
const {
  createTaskValidators,
} = require('../middlewares/taskValidators.middleware');
const { taskExists } = require('../middlewares/tasks.middleware');

//router
const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);

tasksRouter.post('/', createTaskValidators, createTask);

tasksRouter.get('/:status', getTasksByStatus);

tasksRouter.patch('/:id', taskExists, updateTaskById);

tasksRouter.delete('/:id', taskExists, cancelTask);

module.exports = { tasksRouter };