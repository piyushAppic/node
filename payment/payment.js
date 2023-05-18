
var Publishable_Key = 'pk_test_51LeisvSAZjd1IZPPy2vzySetOg5bzhKzaVQo59v7jiil9dT0iOUFpaeYYpTAUXfl86VmrS2AhbNJyyMVVaQZbNGV00SLNJ4kxo'
var Secret_Key = 'sk_test_51LeisvSAZjd1IZPPdwX5Eq4e5iPZuAiKVPFugdv9vfdpe1n30pZErXXu8f18Go8XQC1Rv9C78bt0dkEGyHd2FkNn00DZeFTSUH'

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
      console.log(paymentIntent, "paymentintent")
      res.setHeader('Content-Type', 'application/json'); // Set response content type to JSON
      res.send(JSON.stringify({ clientSecret: paymentIntent.client_secret }));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = { paymentHomePage, paymentResult }