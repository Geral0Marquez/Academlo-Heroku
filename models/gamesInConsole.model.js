
const { db, DataTypes } = require('../utils/database.util');
const { Console } = require('./console.model');
const { Game } = require('./game.model');


//relations

const GamesInConsole = db.define('GamesInConsole', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Game,
      key: 'id'
    }
  },
  consoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Console,
      key: 'id'
    }
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
});

module.exports = { GamesInConsole };