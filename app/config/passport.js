const fs = require('fs');

// Import Passport JWT & Public Key
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const PUBLIC_KEY = fs.readFileSync(__dirname+'/../../private/public_key.pem','utf-8');

// Import Models
const userModel = require('../models/user.model');


// Tells passport where to find the Token (in Bearer Header)
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_KEY,
  algorithms: ['RS256']
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        //Payload contains the userId
        userModel.getById(jwt_payload.sub, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}