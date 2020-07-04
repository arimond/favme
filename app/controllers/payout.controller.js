const payoutModel = require("../models/payout.model.js");


// Import Errors
const InvalidInputError = require('../errors/InvalidInputError');
const InternalServerError = require('../errors/InternalServerError');
const RessourceNotFoundError = require('../errors/RessourceNotFoundError');
const NotEnaughBalanceError = require('../errors/NotEnaughBalanceError');

module.exports = class PayoutController{

    static get(req, res, next) {
        if(req.query.limit){
            payoutModel.getLatestById(req.user.userId, parseInt(req.query.limit), (error, result) => {
                if(error){
                    // Ressource not found
                    if(error.kind === 'not_found'){
                        return next(new RessourceNotFoundError());
                    }
                    // Database Error
                    return next(new InternalServerError());
                }
                // Found payouts
                res.status(200).json(result);
                return;
            });
        }else{
            payoutModel.getAllById(req.user.userId, (error, result) => {
                if(error){
                    // Ressource not found
                    if(error.kind === 'not_found'){
                        return next(new RessourceNotFoundError());
                    }
                    // Database Error
                    return next(new InternalServerError());
                }
                // Found payouts
                res.status(200).json(result);
                return;
            });
        }
    }
    
    static create(req, res, next) {
        const userId = 13;
        // Validate request
        if(!req.body.amount || !(typeof req.body.amount) === 'number' ||
         !req.body.bankaccountId || !(typeof req.body.bankaccountId) === 'number'){
             return next(new InvalidInputError());
        }

        // Check if user has bankaccount
        // Create Payout
        const payout = new payoutModel({
            bankaccountId: req.body.bankaccountId,
            amount: req.body.amount
        });

        payoutModel.create(userId, payout, (error, result) => {
            if(error){
                if(error.kind === 'balance_low'){
                    return next(new NotEnaughBalanceError());
                }
                return next(new InternalServerError());
            }
            // Created Payout
            res.status(200).json(result);
        });
    }

}