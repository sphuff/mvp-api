const db = require('../models');

module.exports = {
    async getUserById(id) {
        return await db.User.findByPk(id);
    },

    async createUser(email, stripeCustomerId, stripeSubscriptionId) {
        return await db.User.create({
          email,
          stripeCustomerId,
          stripeSubscriptionId,
        });
    },

    async updateUser(email, stripeCustomerId, stripeSubscriptionId) {
        return await db.User.update({
          stripeCustomerId,
          stripeSubscriptionId,
        },{ where: { email }});
    },
}