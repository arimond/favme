const bankaccountController = require("../controllers/bankaccount.controller");

module.exports = (app) => {
    app.post('/api/users/:userId/bankaccounts', bankaccountController.create);
    app.get('/api/users/:userId/bankaccounts', bankaccountController.getAll);
    app.get('/api/users/:userId/bankaccounts/:bankaccountId', bankaccountController.getOne);
    app.put('api/users/:userId/bankaccounts/:bankaccountId', bankaccountController.update);
    app.delete('api/users/:userId/bankaccounts/:bankaccountId',bankaccountController.delete);
  }