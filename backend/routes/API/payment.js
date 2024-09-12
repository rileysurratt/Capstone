// This is your test secret API key.
const stripe = require('stripe')('sk_test_51PgcJmKZ1ZTCIr9mLzGkTTWAD7nZngWTWrSOfmHwgk5poTo4NydPS9ANRfLuNQzTTZG0JumLse0X09USbsIVJibx00kz3FKf7Z');
const express = require('express');
const router = express.Router();
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'https://leafy-kitsune-f946dd.netlify.app';

router.post('/create-checkout-session', async (req, res) => {
    console.log("post")
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1Pj9IlKZ1ZTCIr9mDI9P8iQ8',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/order-success`,
  });

  res.send({clientSecret: session.client_secret});
});

router.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

router.get('/test', (req, res)=>{
    return res.json({"hello": "world"})
  })


module.exports = router