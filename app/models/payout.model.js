const sql = require("../config/database.js");

module.exports = class Payout {
    constructor(payout) {
        this.bankaccountId = payout.bankaccountId;
        this.amount = payout.amount;

    }

    // Request a payout
    static create(userId, payout, result) {
        // have to get connection for making transactions
        sql.getConnection((connectionError, connection) => {
            if (connectionError) throw connectionError; // Not connected
            // connection begin transaction
            connection.beginTransaction(transactionError => {
                if (transactionError) throw transactionError;
                // Check if user has bankaccount
                connection.query(
                    'SELECT balance FROM Users WHERE userId = ?', [userId], (balanceError, balanceResult) => {
                        if (!balanceError) {
                            const balance = balanceResult[0].balance;
                            if (balance >= payout.amount) {
                                // Remove balance from User table
                                connection.query('UPDATE Users SET balance = balance - ? WHERE userId = ?', [payout.amount, userId], (updateError, updateResult) => {
                                    if (updateError) {
                                        return connection.rollback(() => {
                                            throw updateError;
                                        });
                                    }
                                    if (updateResult.affectedRows === 1) {
                                        // Create payout
                                        connection.query(
                                            'INSERT INTO Payouts(bankaccountId, amount) VALUES (?, ?)',
                                            [payout.bankaccountId, payout.amount],
                                            (payoutError, payoutResult) => {
                                                // Database Error
                                                if (payoutError) {
                                                    return connection.rollback(() => {
                                                        throw payoutError;
                                                    });
                                                }
                                                // Commit transactions
                                                connection.commit(commitError => {
                                                    if (commitError) {
                                                        return connection.rollback(() => {
                                                            throw commitError;
                                                        });
                                                    }
                                                    // Created Payout
                                                    result(null, { payoutId: payoutResult.insertId, ...payout });
                                                });
                                            }
                                        );
                                    }
                                });
                            } else {
                                // Not enaugh balance on account
                                result({ kind: "balance_low" }, null);
                            }
                        }
                        connection.release();
                        // Error has to be handled after Connection release
                        if (balanceError) {
                            // balance Error
                            return connection.rollback(() => {
                                throw balanceError;
                            });
                        }
                    }
                );
            });
        });
    }

    // Get all payouts from a specific User
    static getAllById(userId, result) {
        sql.query(
            'SELECT Payouts.payoutId, Payouts.bankaccountId, Payouts.amount, Payouts.status, Payouts.requestDate, Payouts.approveDate, ' +
            'Bankaccounts.bankaccountId, Bankaccounts.iban, Bankaccounts.beneficiary ' +
            'FROM Payouts ' +
            'LEFT JOIN Bankaccounts on Payouts.bankaccountId = Bankaccounts.bankaccountId ' +
            'WHERE Bankaccounts.userId = ?',
            [userId],
            (err, res) => {

                // Database Error
                if (err) {
                    result(err, null);
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
            'SELECT Payouts.payoutId, Payouts.bankaccountId, Payouts.amount, Payouts.status, Payouts.requestDate, Payouts.approveDate, ' +
            'Bankaccounts.bankaccountId, Bankaccounts.iban, Bankaccounts.beneficiary ' +
            'FROM Payouts ' +
            'LEFT JOIN Bankaccounts on Payouts.bankaccountId = Bankaccounts.bankaccountId ' +
            'WHERE Bankaccounts.userId = ? ' +
            'ORDER BY payouts.requestDate DESC ' +
            'LIMIT ?',
            [userId, limit],
            (err, res) => {

                // Database Error
                if (err) {
                    result(err, null);
                    return;
                }

                // Return Payouts
                result(null, res);
            }
        );
    }
}