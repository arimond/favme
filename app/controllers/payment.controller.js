const fs = require('fs');

// Import Stripe & Stripe Keys
const stripeSecretKey = fs.readFileSync(__dirname+'/../../private/stripeSecretKey.txt','utf-8');
const endpointSecret = fs.readFileSync(__dirname+'/../../private/endpointSecret.txt','utf-8');
const stripe = require("stripe")(stripeSecretKey);

// Import Models
const productModel = require('../models/product.model');
const sellModel = require('../models/sell.model');
const customerModel = require('../models/customer.model');

// Import Errors
const RessourceNotFoundError = require("../errors/RessourceNotFoundError");
const InternalServerError = require("../errors/InternalServerError");

module.exports = class PaymentController {
  static getSecret(req, res, next) {
    // Get Product Data from productModel
    productModel.getById(
      req.params.userId,
      req.params.productId,
      (error, result) => {
        if (error) {
          // Ressource not found
          if (error.kind === "not_found") {
            return next(new RessourceNotFoundError());
          }
          // Database Error
          return next(new InternalServerError());
        }
        // Product exists and is from User
        // Get PaymentIntent from Stipe API
        stripe.paymentIntents
          .create({
            amount: result.price,
            currency: result.currency,
            // Metadata for storing the Payment Data
            metadata: {
              integration_check: "accept_a_payment",
              productId : req.params.productId
            },
          })
          .then((paymentIntent) => {
            res.json({ client_secret: paymentIntent.client_secret });
          });
      }
    );
  }

  static confirmPayment(req, res) {
    const sig = req.headers["stripe-signature"];
    let payment;
    // Check Signature from Stripe Header for securing that request is not comming from a third party
    try {
      payment = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log(err);
      return res.status(400).send(`Webhook wrong Signature`);
    }
    // Handle Payment Data
    switch (payment.type) {
      case "payment_intent.succeeded":
        const payment = payment.object;
        if(payment.status === 'succeeded'){
          // Testing Webhook with CLI does not provide Metadata in production there will be metadata
          if(payment.metadata.userId && payment.metadata.productId){
            handleOrder(payment.metadata.productId, payment.receipt_email);
          }
        }
        break;
      // Define other Cases, for listening to more events, in our case listening to payment_intent.succeeded is enaugh
      default:
        //Unexpected Payment Type
        return res.status(400).end();
    }
    // Payment was successfull
    return res.json({ received: true });
  }
  handleOrder(productId, customerMail){
    let customerId;
    // Check if customer already exists else create Customer
    customerModel.getByMail(customerMail, (error, result) => {
       if(error){
         if(error.kind === 'not_found'){
           const customer = new customerModel({email: customerMail});
           customerModel.create(customer, (error, result) => {
             if(error){
               // Database Server down, because Customer Mail does not exist
               return;
             }
             customerId = result.customerId;
           })
         }
         customerId = result.customerId;
       }
    });
    
    // Create Sell for customerId and productId
    const sell = new sellModel({
      productId: productId,
      customerId: customerId
    });

    sellModel.create(sell, (error, result) => {
      // Created sell, but we don´t need to do anything
      return;
    });
  }
};

