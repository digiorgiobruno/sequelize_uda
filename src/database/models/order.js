'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belongsToMany 
      Order.belongsToMany(models.Product, {
        as: 'products',
        through: 'orderdetail',

      });
      // belongsTo
      Order.belongsTo(models.State);
      // belongsTo
      Order.belongsTo(models.User);
      // belongsTo
      Order.belongsTo(models.Payment);

      // hasOne
      Order.hasOne(models.Shipping, {
        foreignKey: 'orders_id',
        as: "shippings"
      })

      // belongsToMany
      Order.belongsToMany(models.Product, {
        as: 'products',
        through: 'orderdetail',

      });
    }
  };
  Order.init({
    number: DataTypes.INTEGER,
    date: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    payments_id: DataTypes.INTEGER,
    users_id: DataTypes.INTEGER,
    states_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};