const db = require('../models');

module.exports = {
    async getUserById(id) {
        return await db.User.findByPk(id);
    },

    async getUserByEmail(email) {
        return await db.User.findOne({ where: { email }});
    },

    async createUser(email, stripeCustomerId, stripeSubscriptionId) {
        return await db.User.create({
          email,
          stripeCustomerId,
          stripeSubscriptionId,
        });
    },

    async updateUser(userId, email, stripeCustomerId, stripeSubscriptionId) {
        return await db.User.update({
            email,
            stripeCustomerId,
            stripeSubscriptionId,
        },{ where: { id: userId }});
    },
}