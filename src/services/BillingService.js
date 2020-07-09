const UserService = require("./UserService");
const { BadRequest } = require("../errors");
const ApiKeyService = require("./ApiKeyService");
const crypto = require('crypto');
const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = class BillingService {
    static getInstance(database) {
        this.database = database;
    }

    static async createCheckoutSession(email) {
        if (!email) {
            throw new BadRequest('Must pass email');
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: 'price_1H2K3uEkwtXY5evztLunQLmi',
                quantity: 1,
            }],
            customer_email: email,
            mode: 'subscription',
            success_url: 'http://localhost:3000/billing/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://localhost:3000/billing/cancel',
        });
    
        return session;
    }

    static async handleCheckoutSession(session) {
        const { customer_email: email, customer, subscription } = session;
        // create user
        const user = await UserService.create(email, customer, subscription);
        // then create API key
        await ApiKeyService.create(this.generateRandomString(20), this.generateRandomString(20), user.id)
    }

    static _generateRandomString(length) {
        return crypto.randomBytes(length).toString('hex');
    }
}