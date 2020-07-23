const Database = require('../data');
const { NotFound, BadRequest } = require('../errors');

module.exports = class UserService {
    static async getById(id) {
        const user = await Database.getUserById(id);
        if (!user) throw new NotFound();
        return user;
    }

    static async getByEmail(email) {
        const user = await Database.getUserByEmail(email);
        return user;
    }

    static async create(email, stripeCustomerId, stripeSubscriptionId) {
        if (!email) {
            throw new BadRequest('Must pass in email');
        }
        return await Database.createUser(email, stripeCustomerId, stripeSubscriptionId);
    }

    static async update(userId, email, stripeCustomerId, stripeSubscriptionId) {
        if (!userId || !email || !stripeCustomerId || !stripeSubscriptionId) {
            throw new BadRequest('Must pass in userId, email, stripeCustomerId, and stripeSubscriptionId');
        }
        return await Database.updateUser(userId, email, stripeCustomerId, stripeSubscriptionId);
    }
}