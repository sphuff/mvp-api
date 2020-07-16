const UserService = require("./UserService");
const ApiKeyService = require("./ApiKeyService");
const EmailService = require("./EmailService");
const crypto = require('crypto');


module.exports = class SignupService {
    static async signUp(email) {
        // create user
        const user = await UserService.create(email);
        // then create API key
        await ApiKeyService.create(this._generateRandomString(20), this._generateRandomString(20), user.id)
        await EmailService.sendSignupEmail(email);
        return user;
    }

    static _generateRandomString(length) {
        return crypto.randomBytes(length).toString('hex');
    }
}