const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');
const EmailService = require('../services/EmailService');

module.exports = class AuthController {
    static async createLoginRequest(email) {
        const user = await UserService.getByEmail(email);
        const loginToken = await AuthService.createLoginToken(user);
        await EmailService.sendLoginEmail(email, loginToken.token);
    }
}