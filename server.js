const express = require("express");
const passport = require('passport');


//SETUP

//For access enviroment variables from the .env File by process.env.<Key>
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

//Create Express Application
const app = express ();

// Configure Passport
require('./app/config/passport')(passport);

// parse requests of content-type: application/json
app.use(express.json());

app.use(passport.initialize());


// parse requests of content-type: application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended:true }));

//ROUTES
require("./app/routes/user.routes")(app);
require("./app/routes/bankaccount.routes")(app);
require("./app/routes/document.routes")(app);
require("./app/routes/payout.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/sell.routes")(app);
require("./app/routes/user.routes")(app);

app.get('/', (req, res) => {
    res.json({message: "We are on Home no longer"});
});

//
app.listen(4000);

//Export App only for Testing purpose
module.exports = app; 