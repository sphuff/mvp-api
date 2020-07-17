const Database = require('../data');
const { NotFound, BadRequest } = require('../errors');
const ApiKeyService = require('../services/ApiKeyService');
const AuthService = require('../services/AuthService');

module.exports = class HomeController {
    static async getApiKeyFromRequest(req) {
        const { login_token: loginTokenId } = req.cookies;
        if (!loginTokenId) {
            throw new BadRequest('Must pass login token');
        }
        const loginToken = await AuthService.getLoginToken(loginTokenId);
        const apiKeys = await ApiKeyService.getByUserId(loginToken['UserId']);
        return apiKeys.pop();
    }
}