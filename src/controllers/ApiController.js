
const { UnauthorizedRequest } = require('../errors');
const ApiKeyService = require('../services/ApiKeyService');
const UserService = require('../services/UserService');

module.exports = class ApiController {
    static async validate(bearerToken) {
        await this._validateBearerToken(bearerToken);
        await this._validateApiKey(bearerToken)
    }

    static async _validateBearerToken(bearerToken) {
        if (!bearerToken) {
            throw new UnauthorizedRequest('Must pass valid bearer token in authorization header');
        }
        const { publicKey, privateKey } = this._extractKeysFromBearerToken(bearerToken);
        if (!(publicKey && privateKey)) {
            throw new UnauthorizedRequest('Must pass valid bearer token in authorization header');
        }
    }

    static async _validateApiKey(bearerToken) {
        const apiKey = await this._getApiKeyForBearerToken(bearerToken);
        if (!apiKey.isActive) {
            throw new UnauthorizedRequest('You API key is inactive. Please contact support.');
        }
    }

    static async _getApiKeyForBearerToken(bearerToken) {
        const { publicKey, privateKey } = this._extractKeysFromBearerToken(bearerToken);
        return await ApiKeyService.getByKeys(publicKey, privateKey);
    }

    static async getApiUserFromBearerToken(token) {
        const { publicKey, privateKey } = this._extractKeysFromBearerToken(token);
        const apiKey = await ApiKeyService.getByKeys(publicKey, privateKey);
        const userId = apiKey['UserId'];
        return await UserService.getById(userId);
    }

    static _extractKeysFromBearerToken(bearerToken) {
        // take out "Bearer" piece
        const token = bearerToken.split('Bearer').pop();

        // base64 decoding of public:private
        const bearerTokenStringDecoded = Buffer.from(token, 'base64').toString('utf8');
        // split by colon
        const keyArr = bearerTokenStringDecoded.split(':');
        const publicKey = keyArr[0] ? keyArr[0].trim() : null;
        const privateKey = keyArr[1] ? keyArr[1].trim() : null;
        return { publicKey, privateKey };
    }
}