const ApiKeyService = require('../src/services/ApiKeyService');
const { expect } = require('chai');

let apiKeyId;

describe('ApiKeyService test', () => {
    describe('create tests', () => {
        it('should return api key with valid parameters', async () => {
            const apiKey = await ApiKeyService.create('public', 'private', 1);
            expect(apiKey.privateKey).to.equal('private');
            expect(apiKey.publicKey).to.equal('public');
            expect(apiKey.isActive).to.equal(false);
            expect(apiKey['UserId']).to.equal(1);
            apiKeyId = apiKey.id;
        });
        it('should return error if not passed in public and private key', async () => {
            try {
                const apiKey = await ApiKeyService.create();
                throw new Error('should have thrown');
            } catch(err) {
                expect(err.message).to.equal('Must pass in public and private key');
            }
        });

        it('should return error if invalid user', async () => {
            try {
                const apiKey = await ApiKeyService.create('public', 'private', 12345);
                throw new Error('should have thrown');
            } catch(err) {
                expect(err.message).to.equal('Must pass valid user ID');
            }
        });
    });

    describe('getById tests', () => {
        it('should return generic api key', async () => {
            const apiKey = await ApiKeyService.getById(apiKeyId);
            expect(apiKey.privateKey).to.equal('private');
            expect(apiKey.publicKey).to.equal('public');
            expect(apiKey['UserId']).to.equal(1);
        });
    });
});