const sellController = require("../controllers/sell.controller");

module.exports = (app) => {
    app.get('/api/users/:userId/sells', sellController.get);
}