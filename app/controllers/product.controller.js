const productModel = require("../models/product.model.js");
const payment = require("../lib/payment");

// Import Errors
const InvalidInputError = require('../errors/InvalidInputError');
const InternalServerError = require('../errors/InternalServerError');
const RessourceNotFoundError = require('../errors/RessourceNotFoundError');
const InvalidPriceError = require('../errors/InvalidPriceError');

module.exports = class ProductController{
    static create(req,res,next) {
        // Validate Request
        if(!req.file || !req.body.name || !req.body.price || ! req.body.currency || !req.body.description || 
            !(req.body.currency === 'eur' || req.body.currency === 'usd')){
                return next(new InvalidInputError());
        }

        // Parse Input
        const price = parseInt(req.body.price);
        if(!payment.validatePrice(price)){
            return next(new InvalidPriceError);
        }
        const imageUrl = `http://${process.env.HOST}:${process.env.PORT}/api/images/${req.file.filename}`;
        const feeIncome = payment.calculateProductPay(price);
        
        // Create Product
        const product = new productModel({
            name: req.body.name,
            description: req.body.description,
            image: imageUrl,
            price: price,
            income: feeIncome.income,
            fee: feeIncome.fee,
            currency: req.body.currency
        });

        // Create the product in the database
        productModel.create(req.user.userId, product, (error, result) => {
            // Database Error
            if(error){
                // Internal Server Error 
                return next(new InternalServerError());
            }
            res.status(200).json(result);
        });
    }

    static getAll(req, res,next) {
        productModel.getAllById(req.params.userId, (error, result) => {
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

    static getOne(req, res, next){
        productModel.getById(req.params.userId, req.params.productId, (error, result) => {
            if(error) {
                // Ressource not found
                if(error.kind === "not_found"){
                    return next(new RessourceNotFoundError());
                }
                // Database Error
                return next(new InternalServerError());
            }
            // Product exists and is from user
            res.status(200).json(result);
        });

    }

    static delete(req, res, next) {
        productModel.deleteById(req.user.userId, req.params.productId, (error, result) => {
            if(error){
                if(error.kind === "not_found"){
                    return next(new RessourceNotFoundError());
                }
                return next(new InternalServerError());
            }
            // Product is deleted
            res.status(200).json({success:true, message:'The ressource has been deleted'});
        });
    }

    static update(req, res, next) {
        // Better implementation could allow clients to update without sending all the properties of the product
        // Validate Request
        if(!req.file || !req.body.name || !req.body.price || ! req.body.currency || !req.body.description || 
            !(req.body.currency === 'eur' || req.body.currency === 'usd')){
                return next(new InvalidInputError());
        }

        // Parse Input
        const price = parseInt(req.body.price);
        const imageUrl = `http://${process.env.HOST}:${process.env.PORT}/api/productImages/${req.file.filename}`;
        const feeIncome = payment.calculateProductPay(price);
        
        // Create Product
        const product = new productModel({
            name: req.body.name,
            description: req.body.description,
            image: imageUrl,
            price: price,
            income: feeIncome.income,
            fee: feeIncome.fee,
            currency: req.body.currency
        });

        productModel.updateById(req.user.userId, req.params.productId, product,  (error, result) => {
            if(error){
                if(error.kind === "not_found"){
                    return next(new RessourceNotFoundError());
                }
                return next(new InternalServerError());
            }
            res.status(200).json(result);
        });
        // Delete old picture
    }
}