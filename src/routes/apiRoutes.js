const express = require ('express');
const router = express.Router();
const { handleError } = require('../errors/httpUtils');
const ApiController = require('../controllers/ApiController');

router.use(async (req, res, next) => {
    // here we check the bearer token to make sure they are a valid user
    const { authorization: bearerToken } = req.headers;
    try {
        await ApiController.validateBearerToken(bearerToken);
        next();
    } catch(err) { handleError(err, res) }
});

// YOUR API ROUTES HERE

module.exports = router;