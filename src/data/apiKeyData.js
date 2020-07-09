const db = require('../models');

module.exports = {
    async getApiKeyById(id) {
        return await db.ApiKey.findByPk(id);
    },

    async createApiKey(publicKey, privateKey) {
        return await db.ApiKey.create({
          publicKey,
          privateKey,
        });
    },
}