const sellController = require("../controllers/sell.controller");
const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/api/users/sells',
        passport.authenticate('jwt',{session:false}),
        sellController.get
        );
}