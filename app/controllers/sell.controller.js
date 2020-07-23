const sellModel = require("../models/sell.model.js");

// Import Errors
const InternalServerError = require('../errors/InternalServerError');
const RessourceNotFoundError = require('../errors/RessourceNotFoundError');


module.exports = class SellController{
    static get(req,res, next) {
        if(req.query.limit){
            sellModel.getLatestById(req.user.userId, parseInt(req.query.limit), (error, result) => {
                if(error){
                    // Ressource not found
                    if(error.kind === 'not_found'){
                        return next(new RessourceNotFoundError());
                    }
                    // Database Error
                    return next(new InternalServerError());
                }
                // Found sells
                res.status(200).json(result);
                return;
            });
        }else{
            sellModel.getAllById(req.user.userId, (error, result) => {
                if(error){
                    // Ressource not found
                    if(error.kind === 'not_found'){
                        return next(new RessourceNotFoundError());
                    }
                    // Database Error
                    return next(new InternalServerError());
                }
                // Found sells
                res.status(200).json(result);
                return;
            });
        }
    }
}