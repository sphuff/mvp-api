const express = require ('express');
const router = express.Router();
const ApiKeyService = require('../apiKeys/apiKeyService');
const Database = require('../data');
const { handleError } = require('../errors/httpUtils');

router.get('/', (req, res) => {
    try {
        const apiKey = ApiKeyService.getById(1);
        res.send(apiKey);
    } catch(err) {
        res.status(400).send({error: err.message});
    }
});

router.post('/api-keys', async (req, res) => {
    const { publicKey, privateKey } = req.body;
    console.log(req.body);
    try {
        const apiKey = await ApiKeyService.create(publicKey, privateKey);
        res.send(apiKey);
    } catch(err) {
        handleError(err, res);
    }
});

router.get('/api-keys/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const apiKey = await ApiKeyService.getById(id);
        res.send(apiKey);
    } catch(err) {
        handleError(err, res);
    }
});

module.exports = router;