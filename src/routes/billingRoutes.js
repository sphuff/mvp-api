const express = require ('express');
const router = express.Router();
const { handleError } = require('../errors/httpUtils');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const BillingService = require('../services/BillingService');
const BillingController = require('../controllers/BillingController');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/checkout', async (req, res) => {
  try {
    const { email } = req.body;
    const session = await BillingService.createCheckoutSession(email);
    // create user and inactive key, which will be activated after payment
    await BillingController.createUserAndApiKey(email);
    res.redirect(`/billing/checkout?sessionId=${session.id}`)
  } catch(err) {
    handleError(err, res);
  }
});

router.get('/checkout', async (req, res) => {
  try {
    const { sessionId } = req.query;
    // render checkout view - just redirects to stripe checkout form
    res.render('checkout', {
      sessionId: sessionId,
      stripeKey: process.env.STRIPE_PUBLIC_KEY,
    });
  } catch(err) {
    handleError(err, res);
  }
});

router.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.warn(`Webhook Error: ${err.message}`);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
  
      // activate the user's API key and update billing info
      await BillingService.handleCheckoutSession(session);
    }
  
    // Return a response to acknowledge receipt of the event
    response.json({received: true});
  });

router.get('/success', async (req, res) => {
    const { email } = req.query;
    const loginTokenString = await BillingController.getLoginTokenForUser(email);
    res.redirect(`/login?token=${loginTokenString}`);
});

router.get('/cancel', async (req, res) => {
  // you probably want to redirect to your landing page here
    res.send('cancel');
});

module.exports = router;