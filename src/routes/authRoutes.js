const config = require('config');
const express = require ('express');
const router = express.Router();
const { handleError } = require('../errors/httpUtils');
const AuthService = require('../services/AuthService');
const { BadRequest } = require('../errors');
const AuthController = require('../controllers/AuthController');

const TEN_DAYS_IN_MS = 864000000

router.get('/login', async (req, res) => {
    const { token } = req.query;
    try {
        if (!token) {
            res.render('login', { loginPath: `${config.get('BASE_URL')}/login` });
            return;
        }
        await AuthController.validateLoginToken(token);
        
        // ten day cookie keeps them logged in
        res.cookie('login_token', token, { expires: new Date(Date.now() + TEN_DAYS_IN_MS) });
        res.redirect(`/`);
    } catch(err) { handleError(err, res) }
});

router.post('/login', async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            throw new BadRequest('Invalid email');
        }
        await AuthController.createLoginRequest(email);
        res.send('Check your email for a login link');
    } catch(err) { handleError(err, res) }
});



module.exports = router;