const paymentController = require('../controllers/payment.controller');
const express = require("express");

module.exports = (app) => {
    app.get('/api/users/:userId/products/:productId/secret', express.json(),paymentController.getSecret);
    app.post('/api/webhook', express.raw({type: 'application/json'}),paymentController.confirmPayment);
}