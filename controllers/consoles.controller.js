//model
const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model');


//utils
const { catchAsync } = require('../utils/catchAsync.util');

//Obtener consolas y juegos disponbiles para dicha consola
const getAllConsoles = catchAsync(async (req, res, next) => {
  const consolesRecord = await Console.findAll({
    attributes: ['id', 'name', 'company', 'status'],
    include: [{ model: Game, attributes: ['title', 'genre', 'status'] }],
    where: { status: 'active' },
  });

  res.status(201).json({
    status: 'succes',
    consolesRecord,
  });
});

// Post Crear un nuevo juego (enviar name, company por req.body)
const createVideoGameConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;

  const newConsole = await Console.create({
    name,
    company,
  });

  res.status(201).json({
    status: 'success',
    newConsole,
  });
});


//actualizar el titulo de una consola /:id
const updateTitleConsole = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { console } = req;

  await console.update({ name });

  res.status(201).json({});
});

//Deshabilitar una consola /:id
const  disableConsole = catchAsync(async (req, res, next) => {
  const { console } = req;

  await console.update({ status: 'disabled' });

  res.status(201).json({});
});



module.exports = {
  createVideoGameConsole,
  getAllConsoles,
  updateTitleConsole,
  disableConsole
};
  