const bankaccountController = require("../controllers/bankaccount.controller");
const passport = require('passport');

module.exports = (app) => {
    app.post(
      '/api/users/bankaccounts',
      passport.authenticate('jwt', {session:false}), 
      bankaccountController.create
    );
    app.get(
      '/api/users/bankaccounts',
      passport.authenticate('jwt', {session:false}), 
      bankaccountController.getAll
    );
    // May be no need to implement
    app.get(
      '/api/users/bankaccounts/:bankaccountId', 
      bankaccountController.getOne
    );
    app.put(
      '/api/users/bankaccounts/:bankaccountId',
      passport.authenticate('jwt', {session:false}), 
      bankaccountController.update
    );
    app.delete(
      '/api/users/bankaccounts/:bankaccountId',
      passport.authenticate('jwt', {session:false}), 
      bankaccountController.delete
    );
  }