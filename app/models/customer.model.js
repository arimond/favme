const sql = require("../config/database.js");

module.exports = class Customer{
    constructor(customer){
        this.email = customer.email;
    }

    // Create a customer
    static create(customer, result) {
        sql.query(
            'insert into Customers(email) values(?)',
            [customer.email],
            (err,res) => {
                // Database Error
                if(err){
                result(err, null);
                return;
                }

                // Created Customer
                result(null, {customerId: res.insertId, ...customer});
            }
        );
    }
}
