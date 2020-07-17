const Database = require('../data');
const crypto = require('crypto');

module.exports = class AuthService {
    static async isValidLoginToken(token) {
        const loginToken = await Database.getLoginToken(token);
        console.log('login', loginToken)
        return !!loginToken;
    }

    static async createLoginToken(user) {
        const loginToken = await Database.createLoginToken(this._generateRandomString(20));
        console.log('login', loginToken)
        await user.addLoginToken(loginToken);
        return loginToken;
    }

    static _generateRandomString(length) {
        return crypto.randomBytes(length).toString('hex');
    }
}