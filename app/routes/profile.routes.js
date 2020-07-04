const profileController = require("../controllers/profile.controller");
const upload = require('../config/multer').getPublicUpload();
const passport = require('passport');

module.exports = (app) => {
    app.get('/api/users/:userId/profile', profileController.get);
    app.put(
      '/api/users/profile',
      passport.authenticate('jwt', {session: false}),
      upload.single('image'),
      profileController.update
    );
  }