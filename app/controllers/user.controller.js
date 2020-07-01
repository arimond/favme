const userModel = require('../models/user.model.js');
const utils = require('../lib/utils');

module.exports = class UserController{
    static register(req,res) {
        // Validate request
        if(!req.body || !req.body.username || !req.body.email || !req.body.password || 
            (typeof req.body.username) !== 'string' || (typeof req.body.email) !== 'string' || (typeof req.body.password) !== 'string') {
            // For better practise use Error Handling and design one Error which could be reused for invalid Input 
            res.status(400).send("Invalid Input");
            return;
        }

        // Generate salt and hash
        const saltHash = utils.genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const user = new userModel({
            email: req.body.email,
            username: req.body.username,
            hash: hash,
            salt: salt
        });
        
        // Create the user in the database
        userModel.create(user, (error, result) => {
            //console.log(error, result);
            if(error){
                // For better practise use Error Handling and design one Error which could be reused for invalid Input 
                // May be implement an Error for already existing username and usererror for better user experience
                res.status(400).send("Invalid Input");
                return;
            }
            res.status(200).send("Created User");
        });
    }

    static login(req, res) {
        // Validate Request
        if(!req.body || !req.body.email || !req.body.password ||
            (typeof req.body.email) !== 'string' || (typeof req.body.password) !== 'string'){
                res.status(400).send("Invalid Input");
                return;
        }

        // Get the User from the database
        userModel.getByEmail(req.body.email, (error, user) => {
            if(error){
                // For better user experience return Error: User not found
                res.status(401).send("Invalid User Credentials");
                return;
            }

            // Validate Password with hash and salt from database
            const isValid = utils.validatePassword(req.body.password, user.hash, user.salt);

            // User is invalid
            if(!isValid){
                res.status(401).send("Invalid User Credentials");
                return;
            }

            // User is valid, return token 
            // Get the Jwt Token
            const token = utils.issueJWT(user.userId);
            res.status(200).json({
                token: token.token,
                expiresIn: token.expires
            });
        });
    }

    static getBalance(req, res){
        console.log(req.params.userId);
        console.log(req.params);
        console.log(req.user);
        res.status(200).send({
            message:"It works"
        });
    }
}