'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.json')[env];
const db = {};
const User = require('./user');
const ApiKey = require('./apiKey');
const LoginToken = require('./loginToken');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = User.initialize(sequelize);
db.ApiKey = ApiKey.initialize(sequelize);
db.LoginToken = LoginToken.initialize(sequelize);
db.User.hasMany(ApiKey, { foreignKey: 'UserId' });
db.ApiKey.belongsTo(User, { foreignKey: 'UserId' });
db.User.hasMany(LoginToken, { foreignKey: 'UserId' });
db.LoginToken.belongsTo(User, { foreignKey: 'UserId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
