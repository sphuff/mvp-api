const ApiKeyService = require('../src/apiKeys/apiKeyService');
const { expect } = require('chai');

let apiKeyId;

describe('ApiKeyService test', () => {
    describe('create tests', () => {
        it('should return api key with passed in public and private key', async () => {
            const apiKey = await ApiKeyService.create('public', 'private');
            expect(apiKey.privateKey).to.equal('private');
            expect(apiKey.publicKey).to.equal('public');
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
    });

    describe('getById tests', () => {
        it('should return generic api key', async () => {
            const apiKey = await ApiKeyService.getById(apiKeyId);
            expect(apiKey.privateKey).to.equal('private');
            expect(apiKey.publicKey).to.equal('public');
        });
    });
});