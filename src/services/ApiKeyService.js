const Database = require('../data');
const { NotFound, BadRequest } = require('../errors');

module.exports = class ApiKeyService {
    static async getById(id) {
        const apiKey = await Database.getApiKeyById(id);
        if (!apiKey) throw new NotFound();
        return apiKey;
    }

    static async create(publicKey, privateKey) {
        if (!publicKey || !privateKey) {
            throw new BadRequest('Must pass in public and private key');
        }
        return await Database.createApiKey(publicKey, privateKey);
    }
}