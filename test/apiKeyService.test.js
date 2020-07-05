const ApiKeyService = require('../src/apiKeys/apiKeyService');
const { expect } = require('chai');

describe('ApiKeyService test', () => {
    describe('create tests', () => {
        it('should return api key with passed in public and private key', () => {
            const apiKey = ApiKeyService.create('public', 'private');
            expect(apiKey).to.deep.equal({ privateKey: 'private', publicKey: 'public' });
        });
        it('should return error if not passed in public and private key', () => {
            try {
                const apiKey = ApiKeyService.create();
                throw new Error('should have thrown');
            } catch(err) {
                expect(err.message).to.equal('Must pass in public and private key');
            }
        });
    });

    describe('getById tests', () => {
        it('should return generic api key', () => {
            const apiKey = ApiKeyService.getById(1);
            expect(apiKey).to.deep.equal({ privateKey: 'privateKey', publicKey: 'publicKey' });
        });
    });
});