'use strict';
const {
  Model,
  DataTypes,
} = require('sequelize');

module.exports = class ApiKey extends Model {
    static initialize(sequelize) {
      ApiKey.init({
        publicKey: DataTypes.STRING,
        privateKey: DataTypes.STRING,
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      }, {
        sequelize,
        modelName: 'ApiKey',
      });
      return ApiKey;
    }
};