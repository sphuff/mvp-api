module.exports = class ApiKeyService {
    static getById(id) {
        return { publicKey: 'publicKey', privateKey: 'privateKey' };
    }

    static create(publicKey, privateKey) {
        if (!publicKey || !privateKey) {
            throw new Error('Must pass in public and private key');
        }
        return {
            publicKey: publicKey,
            privateKey: privateKey,
        };
    }
}