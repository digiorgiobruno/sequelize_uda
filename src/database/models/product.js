'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belongsTo
      Product.belongsTo(models.Brand);
      // belongsTo
      Product.belongsTo(models.Category);
      // belongsTo
      Product.belongsTo(models.Size);
      // belongsTo
      Product.belongsTo(models.Gender);
      // hasMany
      Product.hasMany(models.Image, {
        foreignKey: 'products_id',
        as: "images"
      })
      // belongsToMany
      Product.belongsToMany(models.Order, {
        as: 'orders',
        through: 'orderdetail',

      });

    }
  };
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    stock_min: DataTypes.INTEGER,
    stock_max: DataTypes.INTEGER,
    brands_id: DataTypes.INTEGER,
    categories_id: DataTypes.INTEGER,
    sizes_id: DataTypes.INTEGER,
    genders_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};