'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApiKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ApiKey.hasOne(models.User);
    }
  };
  ApiKey.init({
    publicKey: DataTypes.STRING,
    privateKey: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ApiKey',
  });
  return ApiKey;
};