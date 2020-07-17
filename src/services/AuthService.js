const Database = require('../data');
const crypto = require('crypto');

module.exports = class AuthService {
    static async getLoginToken(token) {
        return await Database.getLoginToken(token);
    }

    static async createLoginToken(user) {
        const loginToken = await Database.createLoginToken(this._generateRandomString(20));
        await user.addLoginToken(loginToken);
        return loginToken;
    }

    static _generateRandomString(length) {
        return crypto.randomBytes(length).toString('hex');
    }
}