require('dotenv').config();
const BillingService = require('../src/services/BillingService');
const { expect } = require('chai');
const AuthService = require('../src/services/AuthService');

describe('AuthService tests', () => {
    describe('isValidToken tests', () => {
        it('should return true for valid token', async () => {
            const isValid = await AuthService.isValidLoginToken('abcdef')
            expect(isValid).to.equal(true);
        });
    });
});