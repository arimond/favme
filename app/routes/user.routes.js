const userController = require("../controllers/user.controller");
const passport = require('passport');

module.exports = (app) => {
    app.post('/api/users/register', userController.register);
    app.post('/api/users/login', userController.login);
    app.get('/api/users/balance', passport.authenticate('jwt', { session: false }),userController.getBalance);
  }