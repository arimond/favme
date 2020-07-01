const productController = require("../controllers/product.controller");

module.exports = (app) => {
    app.get('/api/users/:userId/products', productController.getAll);
    app.post('/api/users/:userId/products', productController.create);
    app.get('/api/users/:userId/products/:productId', productController.getOne);
    app.put('api/users/:userId/products/:productId', productController.update);
    app.delete('api/users/:userId/products/:productId',productController.delete);
  }