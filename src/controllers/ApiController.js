
const { UnauthorizedRequest } = require('../errors');
const ApiKeyService = require('../services/ApiKeyService');

module.exports = class ApiController {
    static async validateBearerToken(bearerToken) {
        if (!bearerToken) {
            throw new UnauthorizedRequest('Must pass valid bearer token in authorization header');
        }
        // take out "Bearer" piece
        const token = bearerToken.split('Bearer').pop();

        // base64 decoding of public:private
        const bearerTokenStringDecoded = Buffer.from(token, 'base64').toString('utf8');
        // split by colon
        const keyArr = bearerTokenStringDecoded.split(':');
        const publicKey = keyArr[0] ? keyArr[0].trim() : null;
        const privateKey = keyArr[1] ? keyArr[1].trim() : null;
        if (!(publicKey && privateKey)) {
            throw new UnauthorizedRequest('Must pass valid bearer token in authorization header');
        }

        // make sure key exists
        const apiKey = await ApiKeyService.getByKeys(publicKey, privateKey);
    }
}