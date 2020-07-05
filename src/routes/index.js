const express = require ('express');
const router = express.Router();
const apiRoutes = require('./apiRoutes');

router.get('/', function (req, res) {
    res.render('home', {
        foo: 'bar',
    });
});

router.use('/api', apiRoutes);

module.exports = router;