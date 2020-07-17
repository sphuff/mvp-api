const Database = require('../data');
const { NotFound, BadRequest } = require('../errors');
const ApiKeyService = require('../services/ApiKeyService');

module.exports = class HomeController {
    static async getApiKeyForUser(userId) {
        if (!userId) {
            throw new BadRequest('Must pass user ID');
        }
        const apiKeys = await ApiKeyService.getByUserId(userId);
        return apiKeys.pop();
    }
}