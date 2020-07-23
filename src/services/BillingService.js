const config = require('config');
const UserService = require("./UserService");
const { BadRequest, InternalError } = require("../errors");
const ApiKeyService = require('./ApiKeyService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = class BillingService {
    static async createCheckoutSession(email) {
        if (!email) {
            throw new BadRequest('Must pass email');
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: process.env.STRIPE_PRICE_ID,
                quantity: 1,
            }],
            customer_email: email,
            mode: 'subscription',
            success_url: `${config.get('BASE_URL')}/billing/success?session_id={CHECKOUT_SESSION_ID}&email=${email}`,
            cancel_url: `${config.get('BASE_URL')}/billing/cancel`,
        });
    
        return session;
    }

    static async handleCheckoutSession(session) {
        const { customer_email: email, customer, subscription } = session;
        const user = await UserService.getByEmail(email);
        if (!user) {
            throw new InternalError('User not created before checkout');
        }
        await UserService.update(user.id, email, customer, subscription);
        const apiKeys = await ApiKeyService.getByUserId(user.id);
        apiKeys.map(async apiKey => {
            await ApiKeyService.update(apiKey.id, true);
        });
    }

}