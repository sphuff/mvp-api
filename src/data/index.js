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

    static async getUserById(id) {
        return db.User.findByPk(id);
    }

    static async createUser(email, stripeCustomerId, stripeSubscriptionId) {
        return db.User.create({
          email,
          stripeCustomerId,
          stripeSubscriptionId,
        });
    }
}