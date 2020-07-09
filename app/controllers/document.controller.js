const documentModel = require("../models/document.model.js");

// Import Errors
const InvalidInputError = require('../errors/InvalidInputError');
const InternalServerError = require('../errors/InternalServerError');

module.exports = class DocumentController{
    static create(req,res,next) {
        // Validate Request
        if(!req.file || !req.body.subject || 
            !(req.body.subject === 'bankcard' || req.body.subject === 'identitycard')){
                return next(new InvalidInputError());
        }
        // Create Document
        const document = new documentModel({
            subject: req.body.subject,
            image: req.file.path
        });
        documentModel.create(req.user.userId, document, (error, result) => {
            if(error){
                return next(new InternalServerError());
            }
            res.status(200).json({success: true, message:'The ressource has been created'});
        });
    }
}