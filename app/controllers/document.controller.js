const Document = require("../models/document.model.js");

module.exports = class DocumentController{
    static create(req,res) {
        res.status(200).send({
            message:"It Works"
        });
    }
}