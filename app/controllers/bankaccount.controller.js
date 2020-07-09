const bankaccountModel = require("../models/bankaccount.model.js");

// Import Errors
const InvalidInputError = require('../errors/InvalidInputError');
const InternalServerError = require('../errors/InternalServerError');
const RessourceNotFoundError = require('../errors/RessourceNotFoundError');


module.exports = class BankaccountController{
    static create(req,res, next) {
        // Validate request
        if(!req.body.country || !req.body.beneficiary || !req.body.iban || !req.body.bic ||
            (typeof req.body.country) !== 'string' || (typeof req.body.beneficiary) !== 'string' ||
            (typeof req.body.bic) !== 'string' || (typeof req.body.iban) !== 'string'){
                return next(new InvalidInputError());
        }

        // Create the Bankaccount
        const bankaccount = new bankaccountModel({
            country: req.body.country,
            beneficiary: req.body.beneficiary,
            iban: req.body.iban,
            bic: req.body.bic
        });

        bankaccountModel.create(req.user.userId, bankaccount, (error, result) => {
            if(error){
                return next(new InternalServerError());
            }
            // Bankaccount has been created
            res.status(200).send(result);
        });
    }

    static getAll(req, res, next) {
        bankaccountModel.getAllById(req.user.userId, (error, result) => {
            if(error){
                // Ressource not found
                if(error.kind === 'not_found'){
                    return next(new RessourceNotFoundError());
                }
                // Database Error
                return next(new InternalServerError());
            }
            // Found bankaccounts
            res.status(200).json(result);
        });

    }

    static getOne(req, res){
        // still has to be implemented
    }

    static delete(req, res, next) {
        bankaccountModel.deleteById(req.user.userId, req.params.bankaccountId, (error, result) => {
            if(error){
                if(error.kind === "not_found"){
                    return next(new RessourceNotFoundError());
                }
                return next(new InternalServerError());
            }
            // bankaccount has been deleted
            res.status(200).json({success: true, message: 'The ressource has been deleted'});
        });
    }

    static update(req, res, next) {
        // Validate request
        if(!req.body.country || !req.body.beneficiary || !req.body.iban || !req.body.bic ||
            (typeof req.body.country) !== 'string' || (typeof req.body.beneficiary) !== 'string' ||
            (typeof req.body.bic) !== 'string' || (typeof req.body.iban) !== 'string'){
                return next(new InvalidInputError());
        }

        // Create the Bankaccount
        const bankaccount = new bankaccountModel({
            country: req.body.country,
            beneficiary: req.body.beneficiary,
            iban: req.body.iban,
            bic: req.body.bic
        });

        bankaccountModel.updateById(req.user.userId, req.params.bankaccountId, bankaccount, (error, result) => {
            if(error){
                if(error.kind === "not_found"){
                    return next(new RessourceNotFoundError());
                }
                return next(new InternalServerError());
            }
            // Deleted bankaccount
            res.status(200).json(result);
        });
    }

    static getSecret(req, res) {

    }
}