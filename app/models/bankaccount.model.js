const sql = require("../config/database.js");

module.exports = class BankAccount {
    constructor(bankaccount){
        this.country = bankaccount.country;
        this.beneficiary = bankaccount.beneficiary;
        this.iban = bankaccount.iban;
        this.bic = bankaccount.bic;
    }

    // Creates a new bankaccount
    static create(userId, bankaccount, result) {
        sql.query(
            'insert into Bankaccounts(userId, country, beneficiary, iban, bic) values(?, ?, ?, ?, ?)',
            [userId, bankaccount.country, bankaccount.beneficiary, bankaccount.iban, bankaccount.bic],
            (err, res) => {

                // Database Error
                if(err){
                    result(err, null);
                    return;
                }

                // Created Product
                result(null, {bankaccountId: res.insertId, ...bankaccount});
            }
        );
    }

    // Get all bankaccounts from a specific Users
    static getAllById(userId, result) {
        sql.query(
            'select bankaccountId, userId, country, beneficiary, iban, bic from bankaccounts where userId = ?',
            [userId],
            (err, res) => {

                // Database Error
                if(err){
                    result(err,null);
                    return;
                }

                // Return Products
                result(null, res);
            }
        );
    }

    // Get One bankaccount by the bankaccountId
    static getById(bankaccountId, result) {
        sql.query(
            'select bankaccountId, userId, country, beneficiary, iban, bic from bankaccounts where bankaccountId = ?',
            [bankaccountId],
            (err, res) => {
                 
                //Database Error
                if(err){
                    result(err, null);
                    return;
                }

                //Found one bankaccount
                if(res.length){
                    result(null, res[0]);
                    return;
                }
                
                //Found no bankaccount for the bankaccountId
                result({kind: "not_found"}, null);
            }
        );
    }

    // Delete a Bankaccount 
    /*
        Bankaccount is not deleted in the Database, 
        the isActive property is set to 0 and a new
        Bankaccout is created with the updated values.
        This is for consistency 
    */
    static deleteById(bankaccountId, result) {
        sql.query(
            'update bankaccounts set isActive = 0 where bankaccountId = ?',
            [bankaccountId],
            (err, res) => {
                // Database Error
                if(err){
                    result(err, null);
                    return;
                }

                //Found no bankaccount for the bankaccountId
                if(res.affectedRows == 0){
                    result({kind: "not_found"}, null);
                    return;
                }

                //Delted the product
                result(null, {kind: "deleted_bankaccount"});
            }
        );
    }

    // Update a bankaccount 
    static updateById(userId, bankaccountId, bankaccount, result) {
        this.deleteById(bankaccountId, (err, res) => {
            if(err){
                result(err, res);
                return;
            }
            this.create(userId, bankaccount, (err, res) => {
                result(err,res);
            });
        });
    }
}