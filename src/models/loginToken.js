'use strict';
const {
  Model,
  DataTypes,
} = require('sequelize');

module.exports = class LoginToken extends Model {
    static initialize(sequelize) {
      LoginToken.init({
        token: DataTypes.STRING
      }, {
        sequelize,
        modelName: 'LoginToken',
      });
      return LoginToken;
    }
};