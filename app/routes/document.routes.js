const documentController = require("../controllers/document.controller");
const passport = require('passport');
const upload = require("../config/multer").getPrivateUpload();

module.exports = (app) => {
    app.post(
        '/api/users/documents', passport.authenticate('jwt', {session:false}),
        upload.single('image'),
        documentController.create
    );
}