const express = require ('express');
const router = express.Router();
const apiRoutes = require('./apiRoutes');
const billingRoutes = require('./billingRoutes');

router.get('/', function (req, res) {
    res.render('home', {
        foo: 'bar',
    });
});

router.use('/api', apiRoutes);
router.use('/billing', billingRoutes);

module.exports = router;