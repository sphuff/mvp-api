const express = require ('express');
const router = express.Router();
const apiRoutes = require('./apiRoutes');
const authRoutes = require('./authRoutes');
const billingRoutes = require('./billingRoutes');
const HomeController = require('../controllers/HomeController');
const { handleError } = require('../errors/httpUtils');

router.get('/', async function (req, res) {
    const { apiKeyId } = req.query;
    try {
        const apiKey = await HomeController.index(apiKeyId);
        res.render('home', {
            publicKey: apiKey.publicKey,
            privateKey: apiKey.privateKey,
        });
    } catch(err) {
        handleError(err, res);
    }
});

router.use('/', authRoutes);
router.use('/api', apiRoutes);
router.use('/billing', billingRoutes);

module.exports = router;