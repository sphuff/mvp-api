const UserService = require("./UserService");

module.exports = class BillingService {
    static getInstance(database) {
        this.database = database;
    }

    static async handleCheckoutSession(session) {
        const { customer_email: email, customer, subscription } = session;
        await UserService.create(email, customer, subscription);
    }
}