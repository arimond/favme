const fs = require('fs');
const cors = require('cors');
const express = require("express");
const logger = require('morgan');
const passport = require('passport');


//SETUP

//For access enviroment variables from the .env File by process.env.<Key>
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

// Create Express Application
const app = express();
const https = require('https');

// Allow Corss Origin Ressource Sharing for Browser Policies, it is disabled for testing
if(process.env.NODE_ENV !== 'test'){
    app.use(cors({
        origin: '*',  // Everybody can use the API in Production
        methods: ['GET', 'POST', 'DELETE', 'PUT'] // Methods allowed 
    }));
}


// Logger for development
if(process.env.NODE_ENV === 'development'){
    app.use(logger('dev'));
}


// Configure Passport
require('./app/config/passport')(passport);

// Require Payment Routes befor parsing to JSON, because of signing Issues
require('./app/routes/payment.routes')(app);

// Parse requests of content-type: application/json
app.use(express.json());

// Make the images in public folder accessable
app.use('/api/',express.static('public'));

// ROUTES
require("./app/routes/user.routes")(app);
require("./app/routes/bankaccount.routes")(app);
require("./app/routes/document.routes")(app);
require("./app/routes/payout.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/sell.routes")(app);
require("./app/routes/error.routes")(app);


app.use(passport.initialize());


// Run HTTPS Server and listen on Port
/*
https.createServer({
    key: fs.readFileSync('private/server.key'),
    cert: fs.readFileSync('private/server.cert')
}, app)
.listen(4000);
*/

// For Testing on a diffrent Port, so you can run the app while testing
if(process.env.NODE_ENV !== 'test'){
    app.listen(4000);
}else{
    app.listen(4234);
}
//Export App only for Testing purpose
module.exports = app; 