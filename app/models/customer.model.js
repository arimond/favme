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
                    if(err.code === 'ER_DUP_ENTRY'){
                        return result({kind:'email_already_exists'}, null)
                    }
                    return result(err, null);
                }
                // Created Customer
                return result(null, {customerId: res.insertId, ...customer});
            }
        );
    }

    // Get a customer by email:
    static getByMail(customerMail, result) {
        sql.query(
            'SELECT customerId from Customers where email = ?',
            [customerMail],
            (err, res) => {
                if(err){
                    // Database Error
                    return result(err, null)
                }

                if(!res.length){
                    // No Customer found
                    return result({kind: 'not_found'}, null);
                }

                // Found Customer
                return result(null,res[0]);
            }
        )
    }
}
