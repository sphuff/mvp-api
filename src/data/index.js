const apiKeyData = require('./apiKeyData');
const userData = require('./userData');
const loginTokenData = require('./loginTokenData');

module.exports = {
    ...apiKeyData,
    ...userData,
    ...loginTokenData,
}