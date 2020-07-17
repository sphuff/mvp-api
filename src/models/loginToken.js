'use strict';
const {
  Model,
  DataTypes,
} = require('sequelize');

module.exports = class LoginToken extends Model {
    static initialize(sequelize) {
      LoginToken.init({
        token: {
          type: DataTypes.STRING,
          primaryKey: true,
        }
      }, {
        sequelize,
        modelName: 'LoginToken',
      });
      return LoginToken;
    }
};