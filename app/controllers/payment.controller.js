const stripe = require('stripe')('sk_test_GQtrAtKpHRVWZMkbrYF4OI2F00zB8Ui3RH');
const productModel = require('../models/product.model');
module.exports = class PaymentController{
    static getSecret(req, res){
        // Get PaymentIntent from Stipe API 
        stripe.paymentIntents.create({
            amount: 1099,
            currency: 'usd',
            metadata: {integration_check: 'accept_a_payment'},
        }).then(paymentIntent => {
            res.json({client_secret: paymentIntent.client_secret});
        });
    }
}