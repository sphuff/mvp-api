const Database = require('../data');
const { NotFound, BadRequest } = require('../errors');

module.exports = class UserService {
    static getInstance(database) {
        this.database = database;
    }

    static async getById(id) {
        const user = await Database.getUserById(id);
        if (!user) throw new NotFound();
        return user;
    }

    static async getByEmail(email) {
        const user = await Database.getUserByEmail(email);
        if (!user) throw new NotFound();
        return user;
    }

    static async create(email, stripeCustomerId, stripeSubscriptionId) {
        if (!email) {
            throw new BadRequest('Must pass in email');
        }
        return await Database.createUser(email, stripeCustomerId, stripeSubscriptionId);
    }

    static async update(email, stripeCustomerId, stripeSubscriptionId) {
        if (!email || !stripeCustomerId || !stripeSubscriptionId) {
            throw new BadRequest('Must pass in email, stripeCustomerId, and stripeSubscriptionId');
        }
        return await Database.updateUser(email, stripeCustomerId, stripeSubscriptionId);
    }
}