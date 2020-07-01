const documentController = require("../controllers/document.controller");

module.exports = (app) => {
    app.post('/api/users/:userId/documents', documentController.create);
}