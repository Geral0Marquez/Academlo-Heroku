// Models
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

//http verb: post, get, get, patch and delete

//Obtener a todas las tareas registradas
const getAllTasks = catchAsync(async (req, res, next) => {
	const tasks = await Task.findAll();
	res.status(201).json({
	  status: 'success',
	  tasks,
	});
  });

// crear tarea con "post" teniendo en cuenta: title, userId, y limitDate
// validar los datos con middleware
// se debe indicar la fecha que comienza a registrarse  la tarea
const createTask = catchAsync(async (req, res, next) => {
	const { title, userId, limitDate } = req.body;
  
	const newTask = await Task.create({
	  title,
	  userId,
	  startDate: new Date(startDate),
	  limitDate,
	});
  
	res.status(201).json({
	  status: 'success',
	  newTask,
	});
  });

//Actualizar la tarea de acuerdo con el id.
  const updateTaskById = catchAsync(async (req, res, next) => {
	const { finishDate } = req.body; // la hora en el que usuario termino la tarea
  
	const { task } = req;
   // validar si la tarea existe en nuestra base de datos y de forma activa
	if (task.status === 'active') {
	  
	await task.update({ finishDate });
	let limitDate = new Date(task.dataValues.limitDate); // la fecha limite establecida para realizar la tarea
	let endDateUser = new Date(finishDate); // la fecha estipulada en req.body del usuario
	  
		// comparar si la fecha entregada por el usuario es menor a la fecha limite(estado completado)
		//podemos usar valueof() o toString()
	   if(endDateUser .valueOf() < limitDate.valueOf()) {
		res.status(201).json({
		  status: 'complete',
		  task,
		});
		// pero si la fecha es mayor a la fecha limite (se considera estado tarde)
	  } else {
		res.status(201).json({
		  status: 'late',
		  task,
		});
	  }
	}
  });
  
  
//Obtener las tareas de acuerdo con el status que nos envien
//Para el endpoint GET /:status, validar si el estado (active o puede estar completed o late o cancelled)

  const getTasksByStatus = catchAsync(async (req, res, next) => {
	const { status } = req.params;
  
	if (status === 'active' || 'completed' || 'late' || 'cancelled') {
	  const validateStatus = await Task.findAll({ where: { status } });
	  res.status(201).json({
		status: 'success',
		validateStatus,
	  });
	}
  });
  
 
//Cancelar la tarea (status cancelled)
  const cancelTask = catchAsync(async (req, res, next) => {
	const { task } = req;
  
	await task.update({ status: 'Cancelled' });
  
	res.status(200).json({status: 'success'});
  });
  
  module.exports = {
	createTask,
	getAllTasks,
	getTasksByStatus,
	updateTaskById,
	cancelTask,
  };
  
  