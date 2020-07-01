const Sell = require("../models/sell.model.js");

module.exports = class SellController{
    static get(req,res) {
        //Get All
        //Get Latest
        res.status(200).send({
            message:"It Works"
        });
    }
}