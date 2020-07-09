const Database = require('../data');
const { NotFound, BadRequest } = require('../errors');

module.exports = class ApiKeyService {
    static async getById(id) {
        const apiKey = await Database.getApiKeyById(id);
        if (!apiKey) throw new NotFound();
        return apiKey;
    }

    static async create(publicKey, privateKey, userId) {
        if (!publicKey || !privateKey) {
            throw new BadRequest('Must pass in public and private key');
        }
        const user = await Database.getUserById(userId);
        if (!user) {
            throw new BadRequest('Must pass valid user ID');
        }
        const apiKey = await Database.createApiKey(publicKey, privateKey);

        await user.addApiKey(apiKey);
        // get with updated foreign key
        return await Database.getApiKeyById(apiKey.id);
    }
}