const { app } = require('./app');
//logica de servidor

// Utils
const { db } = require('./utils/database.util');

//models
const { User } = require('./models/user.model');
const { Review } = require('./models/review.model');
const { Game } = require('./models/game.model');
const { Console } = require('./models/console.model');


// Relations

// users es de 1 a muchos comentarios
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

//por cada juego hay varios comentarios
Game.hasMany(Review, { foreignKey: 'gameId' });
Review.belongsTo(Game);

//varios juegos diponibles en varias consolas
Game.belongsToMany(Console, { through: 'gamesInConsole' });
Console.belongsToMany(Game, { through: 'gamesInConsole' });


db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(4005, () => {
	console.log('Express app running!!');
});