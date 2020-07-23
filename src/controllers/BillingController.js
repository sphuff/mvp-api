const UserService = require("../services/UserService");
const ApiKeyService = require("../services/ApiKeyService");
const EmailService = require("../services/EmailService");
const crypto = require('crypto');
const AuthService = require("../services/AuthService");


module.exports = class BillingController {
    static async getLoginTokenForUser(email) {
        const user = await UserService.getByEmail(email);
        const loginToken = await AuthService.createLoginToken(user);
        return loginToken.token;
    }

    static async createUserAndApiKey(email) {
        // create user
        const user = await UserService.create(email);
        // then create API key
        await ApiKeyService.create(this._generateRandomString(20), this._generateRandomString(20), user.id);
        await EmailService.sendSignupEmail(email);
    }

    static _generateRandomString(length) {
        return crypto.randomBytes(length).toString('hex');
    }
}