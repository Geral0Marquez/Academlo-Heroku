// Model's attributes:
const { db, DataTypes } = require('../utils/database.util');
// el id por defecto se registra en la base de datos y se va incrementando donde sequelize hace la inserción en la base de datos
// el email no debe repetirse
const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'Active',
  },
});

module.exports = { User };