const productController = require("../controllers/product.controller");
const passport = require('passport');
const upload= require("../config/multer").getPublicUpload();

module.exports = (app) => {
    app.get('/api/users/:userId/products', productController.getAll);
    app.post(
      '/api/users/products', 
      passport.authenticate('jwt', {session: false}),
      upload.single('image'), 
      productController.create
    );
    app.get('/api/users/:userId/products/:productId', productController.getOne);
    app.put(
      '/api/users/products/:productId',
      passport.authenticate('jwt', {session:false}),
      upload.single('image'), productController.update
    );
    app.delete(
      '/api/users/products/:productId',
      passport.authenticate('jwt', {session:false}),
      productController.delete
      );
  }