
const { UnauthorizedRequest } = require('../errors');
const ApiKeyService = require('../services/ApiKeyService');
const UserService = require('../services/UserService');

module.exports = class ApiController {
    static async validateBearerToken(bearerToken) {
        if (!bearerToken) {
            throw new UnauthorizedRequest('Must pass valid bearer token in authorization header');
        }
        const { publicKey, privateKey } = this._extractKeysFromBearerToken(bearerToken);
        if (!(publicKey && privateKey)) {
            throw new UnauthorizedRequest('Must pass valid bearer token in authorization header');
        }

        // make sure key exists
        const apiKey = await ApiKeyService.getByKeys(publicKey, privateKey);
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