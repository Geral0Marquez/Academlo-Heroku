//models
const { Game } = require('../models/game.model');
const { Review } = require('../models/review.model');

//utils
const { catchAsync } = require('../utils/catchAsync.util');

//obtener juegos registrados, las consolas disponible y los comentarios o reseñas
const getAllGames = catchAsync(async (req, res, next) => {
  const gamesRecord = await Game.findAll({
    attributes: ['title', 'genre', 'status'],
    include: [{model: Review, attributes: ['id', 'comment']}]
  });

  res.status(201).json({
    status: 'success',
    gamesRecord,
  });
});

// Post crear un nuevo juego( title,genre)
const createNewGame = catchAsync(async (req, res, next) => {
  const { title, genre } = req.body;

  const newGame = await Game.create({ title, genre });

  res.status(201).json({
    status: 'success',
    newGame,
  });
});


//Actualizar el título de un juego (solo title) /:id
const updateGame = catchAsync(async (req, res, next) => {
  const { game } = req;

  const { title } = req.body;

  await game.update({ title });

  res.status(201).json({
    status: 'success',
  });
});

//post /reviews/:gameId  reseña sobre el juego( model review)
const gameReviews = catchAsync(async (req, res, next) => {
  const { comment } = req.body;
  const { game,sessionUser } = req; // protectUserAccount en sessionUser

  const newReview = await Review.create({ 
    gameId: game.id,
    userId: sessionUser.id,
    comment,
  });

  res.status(201).json({
    status: 'success',
    newReview,
  });
});


//Deshabilitar un juego /:id
const disableGame = catchAsync(async (req, res, next) => {
  const { game } = req;

  await game.update({ status: 'disabled' });

  res.status(201).json({ status: 'success'});
});


module.exports = {
  createNewGame,
  getAllGames,
  updateGame,
  disableGame,
  gameReviews,
};