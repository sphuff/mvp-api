'use strict';
const {
  Model,
  DataTypes,
} = require('sequelize');

module.exports = class User extends Model {
    static initialize(sequelize) {
      User.init({
        stripeCustomerId: DataTypes.STRING,
        stripeSubscriptionId: DataTypes.STRING,
        email: DataTypes.STRING
      }, {
        sequelize,
        modelName: 'User',
      });
      return User;
    }
};