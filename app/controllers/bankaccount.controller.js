const Bankaccount = require("../models/bankaccount.model.js");

module.exports = class BankaccountController{
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

    static getSecret(req, res) {

    }
}