const db = require('../models');
const { Op } = require('sequelize');

module.exports = {
    async getApiKeyById(id) {
        return await db.ApiKey.findByPk(id);
    },

    async getApiKeysForUserId(userId) {
        return await db.ApiKey.findAll({ where: { 'UserId': userId }});
    },

    async getApiKeyByKeys(publicKey, privateKey) {
        return await db.ApiKey.findOne({
            where: {
                publicKey,
                privateKey,
            },
        });
    },

    async createApiKey(publicKey, privateKey) {
        return await db.ApiKey.create({
          publicKey,
          privateKey,
        });
    },
}