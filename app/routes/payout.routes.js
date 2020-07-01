const payoutController = require("../controllers/payout.controller");

module.exports = (app) => {
    app.get('/api/users/:userId/payouts', payoutController.getAll);
    app.post('/api/users/:userId/payouts', payoutController.create);
}