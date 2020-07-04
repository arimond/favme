const userModel = require('../models/user.model.js');
const utils = require('../lib/authentication');

// Import Errors
const InvalidInputError = require('../errors/InvalidInputError');
const InternalServerError = require('../errors/InternalServerError');
const InvalidCredentials = require('../errors/InvalidCredentials');

module.exports = class UserController {
    static register(req, res, next) {
        // Validate request
        if (!req.body || !req.body.username || !req.body.email || !req.body.password ||
            (typeof req.body.username) !== 'string' || (typeof req.body.email) !== 'string' || (typeof req.body.password) !== 'string') {
            return next(new InvalidInputError());
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
            if (error) {
                return next(new InternalServerError());
            }
            res.status(200).send("Created User");
        });
    }

    static login(req, res, next) {
        // Validate Request
        if (!req.body || !req.body.email || !req.body.password ||
            (typeof req.body.email) !== 'string' || (typeof req.body.password) !== 'string') {
            return next(new InvalidInputError());
        }

        // Get the User from the database
        userModel.getByEmail(req.body.email, (error, user) => {
            // No User for email
            if (error) {
                return next(new InvalidCredentials());
            }

            // Validate Password with hash and salt from database
            const isValid = utils.validatePassword(req.body.password, user.hash, user.salt);

            // User is invalid
            if (!isValid) {
                // Password is invalid for User
                return next(new InvalidCredentials());
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

    static getBalance(req, res, next) {
        userModel.getBalanceById(req.user.userId, (error, balance) => {
            if (error) {
                // Is always internal database Error, because we know the User exists in the database
                return next(new InternalServerError());
            }
            // Return the balance
            res.status(200).json({ balance: balance.balance });
        });
    }
}