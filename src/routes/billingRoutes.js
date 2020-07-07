const express = require ('express');
const router = express.Router();
const { handleError } = require('../errors/httpUtils');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const bodyParser = require('body-parser');
const BillingService = require('../services/BillingService');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/checkout', async (req, res) => {
    const { email } = req.body;
    const session = await BillingService.createCheckoutSession(email)
    res.send(session);
});

router.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
  
      console.log(event);
      // Fulfill the purchase...
      await BillingService.handleCheckoutSession(session);
    }
  
    // Return a response to acknowledge receipt of the event
    response.json({received: true});
  });

router.get('/success', async (req, res) => {
    res.send('success');
});

router.get('/cancel', async (req, res) => {
    res.send('cancel');
});

module.exports = router;