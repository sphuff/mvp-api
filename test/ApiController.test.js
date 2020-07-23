require('dotenv').config();
const { expect } = require('chai');
const ApiController = require('../src/controllers/ApiController');
const ApiKeyService = require('../src/services/ApiKeyService');
const db = require('../src/models');

const makeBearerToken = (publicKey, privateKey) => {
    const token = Buffer.from(`${publicKey}:${privateKey}`).toString('base64');
    return `Bearer ${token}`;
}

describe('ApiController tests', () => {
    describe('bearer token validation tests', () => {
        before(async () => {
            const apiKey = await ApiKeyService.create('12345', '6789', 1);
            const apiKeyInactive = await ApiKeyService.create('inactive', 'key', 1);
            await ApiKeyService.update(apiKey.id, true);
        });
        after(async () => {
            const apiKey = await ApiKeyService.getByKeys('12345', '6789');
            const apiKeyInactive = await ApiKeyService.getByKeys('inactive', 'key');
            db.ApiKey.destroy({ where: { id: apiKey.id }})
            db.ApiKey.destroy({ where: { id: apiKeyInactive.id }})
        });

        it('should throw unauthorized error when no token', async () => {
            try {
                await ApiController.validate(null);
                throw new Error('Should throw');
            } catch(err) {
                expect(err.message).to.equal('Must pass valid bearer token in authorization header');
            }
        });
        it('should throw unauthorized error when token malformed', async () => {
            try {
                await ApiController.validate(null);
                throw new Error('Should throw');
            } catch(err) {
                expect(err.message).to.equal('Must pass valid bearer token in authorization header');
            }
        });
        it('should throw unauthorized error when api key is inActive', async () => {
            try {
                await ApiController.validate(makeBearerToken('inactive', 'key'));
                throw new Error('Should throw');
            } catch(err) {
                expect(err.message).to.equal('You API key is inactive. Please contact support.');
            }
        });
        it('should pass when valid token', async () => {
            await ApiController.validate(makeBearerToken('12345', '6789'));
        });
    });
});