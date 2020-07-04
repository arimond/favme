const sql = require("../config/database.js");

module.exports = class User {
    constructor(user) {
        this.email = user.email;
        this.username = user.username;
        this.hash = user.hash;
        this.salt = user.salt;
    }

    // Creates a new User in the Database
    static create(user, result) {
        sql.query(
            'insert into Users(username, hash, salt, email) values(?, ?, ?, ?)',
            [user.username, user.hash, user.salt, user.email],
            (err, res) => {

                // Database Error
                if(err){
                    result(err, null);
                    return;
                }

                // Created User 
                result(null, {userId: res.insertId, ...user});
            }
        );
    }

    // Returns a User by its email
    static getByEmail(email, result){
        sql.query(
            'select userId, username, hash, salt, email from Users where email = ?',
            [email],
            (err, res) => {

                // Database Error
                if(err){
                    result(err, null);
                    return;
                }

                // Found one User
                if(res.length){
                    result(null, res[0]);
                    return;
                }

                // Found no User for the email address
                result({kind: "not_found"}, null);
            }
        );
    }

    // Returns a User by its Id
    static getUserById(userId, result) {
        sql.query(
            'select userId, username, hash, salt from Users where userId = ?',
            [userId],
            (err, res) =>{

                // Database Error
                if(err){
                    result(err, null);
                    return;
                }

                // Found one User
                if(res.length){
                    result(null, res[0]);
                    return;
                }

                // Found no User for the email address
                result({kind: "not_found"}, null);
            }
        )
    }

    // Return the Balance of a User by its userId
    static getBalanceById(userId, result){
        sql.query(
            'select userId, balance from users where userId = ?',
            [userId],
            (err, res) => {
                // Database Error
                if(err){
                    result(err, null);
                    return;
                }

                // Found the Balance of the User
                if(res.length){
                    result(null, res[0]);
                    return;
                }
            }
        );
    }

    // Add Balance of a User by its userId
    static addBalanceById(userId, value, result){
        sql.query(
            'UPDATE Users SET balance = balance + ? WHERE userId = ? ',
            [value, userId],
            (err, res) => {
                // Database Error
                if(err){
                    result(err, null);
                    return;
                }

                // Added the Balance to the User
                if(res.affectedRows === 1 && res.changedRows === 1){
                    result(null, {kind: "added_balance"});
                    return;
                }

            }
        );
    }
}





