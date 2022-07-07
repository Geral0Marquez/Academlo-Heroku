const express = require('express');

//controllers
const {
  getAllGames,
  createNewGame,
  updateGame,
  disableGame,
  gameReviews ,
} = require('../controllers/games.controller');

//middleware
const { protectSession } = require('../middlewares/auth.middleware');
const { gameExists } = require('../middlewares/games.middleware');

const gamesRouter = express.Router();

gamesRouter.get('/', getAllGames);

gamesRouter.use(protectSession);

gamesRouter.post('/', createNewGame);

gamesRouter.post('/reviews/:gameId', gameExists, gameReviews);

gamesRouter
  .use('/:id', gameExists)
  .route('/:id')
  .patch(updateGame)
  .delete(disableGame);

module.exports = { gamesRouter };