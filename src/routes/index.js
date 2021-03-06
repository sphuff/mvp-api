const config = require('config');
const express = require ('express');
const router = express.Router();
const path = require('path');
const apiRoutes = require('./apiRoutes');
const authRoutes = require('./authRoutes');
const billingRoutes = require('./billingRoutes');
const HomeController = require('../controllers/HomeController');
const { handleError } = require('../errors/httpUtils');

// REMOVE ME
router.get('/landing', (req, res) => res.render('landing'));

router.get('/', async function (req, res) {
    try {
        const apiKeys = await HomeController.getApiKeysFromRequest(req);
        res.render('home', {
            docPath: `${config.get('BASE_URL')}/docs`,
            apiKeys: apiKeys.map(function(apiKey) {
                return {
                    publicKey: apiKey.publicKey,
                    privateKey: apiKey.privateKey
                }
            }),
        });
    } catch(err) {
        handleError(err, res);
    }
});

router.use('/', authRoutes);
router.use('/', express.static(path.join(__dirname, '..', '/static')));
router.use('/docs', express.static(path.join(__dirname, '..', '/docs')))
router.use('/api/v1', apiRoutes);
router.use('/billing', billingRoutes);

module.exports = router;