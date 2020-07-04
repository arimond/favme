const sql = require("../config/database.js");

module.exports = class Product{
    constructor(product){
        this.name = product.name;
        this.description = product.description;
        this.image = product.image;
        this.price = product.price;
        this.income = product.income;
        this.fee = product.fee;
        this.currency = product.currency;
    }

    // Creates a new Product 
    static create(userId, product, result) {
        sql.query(
            'insert into Products(userId, name, description, image, price, income, fee, currency) values(?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, product.name, product.description, product.image, product.price, product.income, product.fee, product.currency],
            (err, res) => {

                // Database Error
                if(err){
                    result(err, null);
                    return;
                }

                // Created Product
                result(null, {productId: res.insertId, ...product});
            }
        );
    }

    // Get all Products from a specific User
    static getAllById(userId, result) {
        sql.query(
            'select productId, userId, name, description, image, price, income, fee, currency from products where userId = ? and isActive = 1',
            [userId],
            (err, res) => {

                // Database Error
                if(err){
                    result(err,null);
                    return;
                }

                // Request not found
                if(!res.length){
                    result({kind:"not_found"}, null);
                    return;
                }

                // Return Products
                result(null, res);
            }
        );
    }

    // Get One Product by the productId
    static getById(userId, productId, result) {
        sql.query(
            'select productId, userId, name, description, image, price, income, fee, currency from products where productId = ? and userId = ?  and isActive = 1',
            [productId, userId],
            (err, res) => {
                 
                //Database Error
                if(err){
                    result(err, null);
                    return;
                }

                //Found one Product
                if(res.length){
                    result(null, res[0]);
                    return;
                }
                
                //Found no Product for the productId
                result({kind: "not_found"}, null);
            }
        );
    }

    // Delete a Product 
    static deleteById(userId, productId, result) {
        sql.query(
            'update products set isActive = 0 where productId = ? and userId = ? and  isActive = 1',
            [productId, userId],
            (err, res) => {
                // Database Error
                if(err){
                    result(err, null);
                    return;
                }

                //Found no Product for the productId
                if(res.affectedRows == 0){
                    result({kind: "not_found"}, null);
                    return;
                }

                //Delted the product
                result(null, {kind: "deleted_product"});
            }
        );
    }


    // Update a product 
    static updateById(userId, productId, product, result) {
        this.deleteById(userId, productId, (err, res) => {
            if(err){
                result(err, res);
                return;
            }
            this.create(userId, product, (err, res) => {
                result(err,res);
            });
        });
    }
}
