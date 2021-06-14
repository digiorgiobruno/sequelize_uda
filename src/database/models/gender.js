'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // hasMany
      Gender.hasMany(models.Product, {
        foreignKey: 'genders_id',
        as: "products"
      })
    }
  };
  Gender.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gender',
  });
  return Gender;
};