'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // hasMany
      User.hasMany(models.Order, {
        foreignKey: 'users_id',
        as: "orders"
      })
      //belongsTo
      User.belongsTo(models.Address);

      // belongsToMany
      User.belongsToMany(models.Rol, {
        as: 'rols',
        through: 'user_has_rols',

      });
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    addresses_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};