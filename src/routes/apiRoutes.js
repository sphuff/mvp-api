const express = require ('express');
const router = express.Router();
const ApiKeyService = require('../apiKeys/apiKeyService');

router.get('/', (req, res) => {
    try {
        const apiKey = ApiKeyService.getById(1);
        res.send(apiKey);
    } catch(err) {
        res.status(400).send({error: err.message});
    }
});

module.exports = router;