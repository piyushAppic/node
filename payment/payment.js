
var Publishable_Key = process.env.Publishable_Key
var Secret_Key = process.env.Secret_Key

const stripe = require('stripe')(Secret_Key)

const paymentHomePage =  function(req, res){
	res.render('Home', {
	key: Publishable_Key
	})
}


const paymentResult = async(req, res) => {
    const { amount } = req.body;
    // console.log(amount, "amount")
    // console.log(req.body)
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe amount is in cents
        currency: 'usd',
      });
      // console.log(paymentIntent, "paymentintent")
      res.setHeader('Content-Type', 'application/json'); // Set response content type to JSON
      res.send(JSON.stringify({ clientSecret: paymentIntent.client_secret }));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = { paymentHomePage, paymentResult }