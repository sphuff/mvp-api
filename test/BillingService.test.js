require('dotenv').config();
const BillingService = require('../src/services/BillingService');
const { expect } = require('chai');
const crypto = require('crypto');
const UserService = require('../src/services/UserService');
const ApiKeyService = require('../src/services/ApiKeyService');
const db = require('../src/models');

describe('BillingService tests', () => {
    describe('createCheckoutSession tests', () => {
        it('should throw BadRequest error if email not provided', async () => {
            try {
                await BillingService.createCheckoutSession();
                throw new Error('Should not reach');
            } catch(err) {
                expect(err.message).to.equal('Must pass email');
            }
        });

        it('should create checkout session if email is provided', async () => {
            const session = await BillingService.createCheckoutSession('test@email.com');
            expect(session.id).to.exist;
            expect(session.customer_email).to.equal('test@email.com');    
        });
    });
    describe('handleCheckoutSession tests', () => {
        before(async () => {
            const user = await UserService.create('test111@email.com');
            const publicKey = crypto.randomBytes(10).toString('hex');
            const privateKey = crypto.randomBytes(10).toString('hex');
            await ApiKeyService.create(publicKey, privateKey, user.id);
        });

        after(async () => {
            const user = await UserService.getByEmail('test111@email.com');
            db.ApiKey.destroy({ where: { 'UserId': user.id }});
            db.User.destroy({ where: { id: user.id }});
        });

        it('should update user with customer ID and subscription ID', async () => {
            const session = {
                customer_email: 'test111@email.com',
                customer: 'cust',
                subscription: 'sub',
            };
            const initialUser = await UserService.getByEmail('test111@email.com');
            const initialApiKey = (await ApiKeyService.getByUserId(initialUser.id)).pop();
            expect(initialApiKey.isActive).to.equal(false);
            await BillingService.handleCheckoutSession(session);
            const updatedUser = await UserService.getByEmail('test111@email.com');
            const updatedApiKey = (await ApiKeyService.getByUserId(initialUser.id)).pop();
            expect(updatedUser.stripeCustomerId).to.equal('cust');
            expect(updatedUser.stripeSubscriptionId).to.equal('sub');
            expect(updatedApiKey.isActive).to.equal(true);
        });
    });
});