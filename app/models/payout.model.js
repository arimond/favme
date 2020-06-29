const sql = require("../config/database.js");

module.exports = class Payout{
    constructor(payout){
        this.bankaccountId = payout.bankaccountId;
        this.amount = payout.amount;

    }

    // Create a payout
    static create(payout, result) {
        sql.query(
            'INSERT INTO Payouts(bankaccountId, amount) VALUES (?, ?)',
            [payout.bankaccountId, payout.amount],
            (err, res) => {

                // Database Error
                if(err){
                    result(err, null);
                    return;
                }

                // Created Payout
                result(null, {payoutId: res.insertId, ...payout});
            }
        );
    }

    // Get all payouts from a specific User
    static getAllById(userId, result) {
        sql.query(
            'SELECT Payouts.payoutId, Payouts.bankaccountId, Payouts.amount, Payouts.status, Payouts.requestDate, Payouts.approveDate, '+
            'Bankaccounts.bankaccountId, Bankaccounts.iban, Bankaccounts.beneficiary '+
            'FROM Payouts '+
            'LEFT JOIN Bankaccounts on Payouts.bankaccountId = Bankaccounts.bankaccountId '+
            'WHERE Bankaccounts.userId = ?',
            [userId],
            (err, res) => {

                // Database Error
                if(err){
                    result(err,null);
                    return;
                }

                // Return Payouts
                result(null, res);
            }
        );
    }

    // Get all payouts from a specific User
    static getLatestById(userId, limit, result) {
        sql.query(
            'SELECT Payouts.payoutId, Payouts.bankaccountId, Payouts.amount, Payouts.status, Payouts.requestDate, Payouts.approveDate, '+
            'Bankaccounts.bankaccountId, Bankaccounts.iban, Bankaccounts.beneficiary '+
            'FROM Payouts '+
            'LEFT JOIN Bankaccounts on Payouts.bankaccountId = Bankaccounts.bankaccountId '+
            'WHERE Bankaccounts.userId = ? '+
            'ORDER BY payouts.requestDate DESC '+
            'LIMIT ?',
            [userId, limit],
            (err, res) => {
    
                // Database Error
                if(err){
                    result(err,null);
                    return;
                }
    
                // Return Payouts
                result(null, res);
            }
        );
    }
}