const express = require('express');

//controllers
const {
  getAllConsoles,
  createVideoGameConsole,
  updateTitleConsole,
  disableConsole,
} = require('../controllers/consoles.controller');

//middlewares
const { consoleExists } = require('../middlewares/consoles.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const consolesRouter = express.Router();

consolesRouter.get('/', getAllConsoles);

consolesRouter.use(protectSession);

consolesRouter.post('/',createVideoGameConsole );


consolesRouter
  .use('/:id', consoleExists)
  .route('/:id')
  .patch(updateTitleConsole)
  .delete(disableConsole);

module.exports = { consolesRouter };