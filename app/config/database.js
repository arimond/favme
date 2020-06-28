//For access enviroment variables from the .env File by process.env.<Key>
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const mysql = require('mysql');
const env = process.env.NODE_ENV.toUpperCase();

// Create a Connection to the MySQL Database
const connection = mysql.createPool({
    connectionLimit: process.env['DB_POOL_LIMIT_'+env],
    host: process.env['DB_HOST_'+env],
    port: process.env['DB_PORT_'+env],
    user: process.env['DB_USER_'+env],
    password: process.env['DB_PASSWORD_'+env],
    database: process.env['DB_NAME_'+env]
});

/*
// open the MySQL Connection
connection.connect(error => {
    if(error) {
        throw error;
        return;
    }
});
*/

module.exports = connection;


