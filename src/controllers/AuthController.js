const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');
const EmailService = require('../services/EmailService');
const { UnauthorizedRequest } = require('../errors');

module.exports = class AuthController {
    static async createLoginRequest(email) {
        const user = await UserService.getByEmail(email);
        const loginToken = await AuthService.createLoginToken(user);
        await EmailService.sendLoginEmail(email, loginToken.token);
    }

    static async validateLoginToken(token) {
        const loginToken = await Database.getLoginToken(token);
        const isValidToken = !!loginToken;
        if (!isValidToken) {
            throw new UnauthorizedRequest('Invalid login token');
        }
    }
}