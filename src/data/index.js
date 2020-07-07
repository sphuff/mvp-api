const { Sequelize } = require('sequelize');
const config = require('config');
const db = require('../models');

module.exports = class Database {
    static async getApiKeyById(id) {
        return db.ApiKey.findByPk(id);
    }

    static async createApiKey(publicKey, privateKey) {
        return db.ApiKey.create({
          publicKey,
          privateKey,
        });
    }
}