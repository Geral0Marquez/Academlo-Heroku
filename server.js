const { app } = require('./app');
//logica de servidor

// Utils
const { db } = require('./utils/database.util');

//models
const { Meal } = require('./models/meal.model');
  const { Order } = require('./models/order.model');
  const { Restaurant } = require('./models/restaurant.model');
  const { Review } = require('./models/review.model');
  const { User } = require('./models/user.model');
  

// Relations

Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Review.belongsTo(Restaurant);

Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
Meal.belongsTo(Restaurant);

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User);

Meal.hasOne(Order, { foreignKey: 'mealId' });
Order.belongsTo(Meal);



db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(4005, () => {
	console.log('Express app running!!');
});