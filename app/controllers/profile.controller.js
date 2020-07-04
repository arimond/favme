const profileModel = require("../models/profile.model.js");

// Import Errors
const InvalidInputError = require('../errors/InvalidInputError');
const InternalServerError = require('../errors/InternalServerError');
const RessourceNotFoundError = require('../errors/RessourceNotFoundError');


module.exports = class ProfileController{
    static get(req, res, next) {
        profileModel.getById(req.params.userId, (error, result) => {
            if(error){
                // Ressourse not found
                if(error.kind === "not_found"){
                    return next(new RessourceNotFoundError());
                }
                // Database Error
                return next(new InternalServerError());
            }

            // Product exists
            res.status(200).json(result);
        });
        
    }
    
    static update(req, res, next) {
        // Validate request
        if(!req.file || !req.body.email || !req.body.profession || !req.body.phone || !req.body.description) {
                return next(new InvalidInputError());
            }
        
        // Parse Image Url
        const imageUrl = `http://${process.env.HOST}:${process.env.PORT}/api/productImages/${req.file.filename}`;

        // Create profile
        const profile = new profileModel({
            email: req.body.email,
            profession: req.body.profession,
            phone: req.body.phone,
            description: req.body.description,
            image: imageUrl
        });

        profileModel.updateById(req.user.userId, profile, (error, result) => {
            if(error){
                // Database Error
                return next(new InternalServerError());
            }
            
            // Updated profile
            res.status(200).send("Updated Profile successfully");
        });
    }

}