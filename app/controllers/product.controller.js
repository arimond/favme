const Product = require("../models/product.model.js");

module.exports = class ProductController{
    static create(req,res) {
        res.status(200).send({
            message:"It Works"
        });
    }

    static getAll(req, res) {
        //Implement getAll
        //Implement getAllById
    }

    static getOne(req, res){
        console.log(req.params.userId);
        res.status(200).send({
            message:"It works"
        });

    }

    static delete(req, res) {
        //
    }

    static update(req, res) {

    }
}