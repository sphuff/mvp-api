require('dotenv').config();
const { expect } = require('chai');
const AuthService = require('../src/services/AuthService');

describe('AuthService tests', () => {
    describe('getLoginToken tests', () => {
        it('should return valid token when passed valid token string', async () => {
            const token = await AuthService.getLoginToken('abcdef')
            expect(token.token).to.equal('abcdef');
            expect(token['UserId']).to.equal(1);
        });
        it('should return return null for invalid token string', async () => {
            const token = await AuthService.getLoginToken('11111')
            expect(token).to.equal(null);
        });
    });
});