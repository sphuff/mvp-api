const Database = require('../data');
const { NotFound, BadRequest } = require('../errors');

module.exports = class HomeController {
    static async index(apiKeyId) {
        if (!apiKeyId) {
            throw new BadRequest('Must pass API key');
        }
    }
}