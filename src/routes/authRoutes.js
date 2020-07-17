const express = require ('express');
const router = express.Router();
const { handleError } = require('../errors/httpUtils');
const AuthService = require('../services/AuthService');
const EmailService = require('../services/EmailService');
const { BadRequest } = require('../errors');
const UserService = require('../services/UserService');

router.get('/login', async (req, res) => {
    const { token } = req.query;
    try {
        if (!token) {
            res.render('login');
            return;
        }
        const isValid = await AuthService.isValidLoginToken(token);
        if (!isValid) {
            // redirect to login in future
            throw new BadRequest('Invalid token');
        }
        // do login magic here
    } catch(err) { handleError(err, res) }
});

router.post('/login', async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            // redirect to login in future
            throw new BadRequest('Invalid email');
        }
        const user = await UserService.getByEmail(email);
        const loginToken = await AuthService.createLoginToken(user);
        await EmailService.sendLoginEmail(email, loginToken.token);
        res.send('Check your email for a login link');
    } catch(err) { handleError(err, res) }
});



module.exports = router;