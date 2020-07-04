const payoutController = require("../controllers/payout.controller");
const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/api/users/payouts',
        passport.authenticate('jwt', {session: false}),
        payoutController.get
        );
    app.post('/api/users/payouts', payoutController.create);
}