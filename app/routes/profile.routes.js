const profileController = require("../controllers/profile.controller");

module.exports = (app) => {
    app.get('/api/users/:userId/profiles/:profileId', profileController.get);
    app.put('api/users/:userId/profiles/:profileId', profileController.update);
  }