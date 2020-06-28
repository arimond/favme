const sql = require("../config/database.js");

module.exports = class Sell{
    constructor(sell){
        this.productId = sell.productId;
        this.customerId = sell.customerId;
    }

    // Create a Sell
    static create(sell, result) {
        sql.query(
            'insert into Sells(productId, customerId) values(?, ?)',
            [sell.productId, sell.customerId, sell.income, sell.fee],
            (err, res) => {

                // Database Error
                if(err){
                    result(err, null);
                    return;
                }

                // Created Sell
                result(null, {productId: res.insertId, ...sell});
            }
        );
    }

    // Get all Sells from a specific User
    static getAllById(userId, result) {
        sql.query(
            'SELECT sells.sellId, sells.productId, '+
            'products.name, products.price, products.income, products.fee, customers.email, sells.date FROM Sells '+
            'LEFT JOIN products ON sells.productId = products.productId '+
            'LEFT JOIN customers ON sells.customerId = customers.customerId '+
            'WHERE products.userId = ?',
            [userId],
            (err, res) => {

                // Database Error
                if(err){
                    result(err,null);
                    return;
                }

                // Return Sells
                result(null, res);
            }
        );
    }

    // Get all Sells from a specific User
    static getLatestById(userId, limit, result) {
        sql.query(
            'SELECT sells.sellId, sells.productId, '+
            'products.name, products.price, products.income, products.fee, customers.email, sells.date FROM Sells '+
            'LEFT JOIN products ON sells.productId = products.productId '+
            'LEFT JOIN customers ON sells.customerId = customers.customerId '+
            'WHERE products.userId = ? '+
            'ORDER BY sells.date DESC '+
            'LIMIT ?',
            [userId, limit],
            (err, res) => {
    
                // Database Error
                if(err){
                    result(err,null);
                    return;
                }
    
                // Return Sells
                result(null, res);
            }
        );
    }
}