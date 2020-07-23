const sql = require("../config/database.js");

module.exports = class Document{
    constructor(document){
        this.subject = document.subject;
        this.image = document.image;
    }

    // Creates a new Document in the Database
    static create(userId, document, result) {
        sql.query(
            'insert into Documents(userId, subject, image) values(?, ?, ?)',
            [userId, document.subject, document.image],
            (err, res) => {
                // Database Error
                if(err){
                    return result(err, null);
                }

                // Created Document
                return result(null, {documentId: res.insertId, ...document});
            }
        );
    } 
}
