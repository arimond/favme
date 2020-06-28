import express, { json } from 'express';


//SETUP

//For access enviroment variables from the .env File by process.env.<Key>
require('dotenv').config();

console.log(process.env.DB_USER)

//Create Express Application
const app = express ();

//Parse requests of content-type: application/json
app.use(json());

//ROUTES
app.get('/', (req, res) => {
    res.json({message: "We are on Home no longer"});
});

//
app.listen(4000);