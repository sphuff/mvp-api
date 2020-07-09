'use strict';
const {
  Model,
  DataTypes,
} = require('sequelize');

module.exports = class ApiKey extends Model {
    static initialize(sequelize) {
      ApiKey.init({
        publicKey: DataTypes.STRING,
        privateKey: DataTypes.STRING
      }, {
        sequelize,
        modelName: 'ApiKey',
      });
      return ApiKey;
    }
};