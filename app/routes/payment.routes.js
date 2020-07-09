const paymentController = require('../controllers/payment.controller');

module.exports = (app) => {
    app.get('/api/users/:userId/products/:productId/secret', paymentController.getSecret);
}