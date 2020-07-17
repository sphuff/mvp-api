const db = require('../models');

module.exports = {
    async getLoginToken(token) {
        return await db.LoginToken.findOne({ where: { token }});
    },

    async createLoginToken(token) {
        return await db.LoginToken.create({ token });
    },
}