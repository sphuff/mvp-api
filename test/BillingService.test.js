require('dotenv').config();
const BillingService = require('../src/services/BillingService');
const { expect } = require('chai');

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
});