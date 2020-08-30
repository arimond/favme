const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const PRIVATE_KEY = fs.readFileSync(__dirname+'/../../private/private_key.pem','utf-8');

module.exports = class Authentication {
  /*
    This function validates the password. It uses the crypto library to decrypt the hash using the salt and then compares
    the decrypted hash/salt with the password that the user provided at login
  */
  static validatePassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
  }

  // This function takes a plain text password and creates a salt and hash out of it
  static genPassword(password){
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
      salt: salt,
      hash: genHash,
    };
  }

  
  static issueJWT(userId) {
    const expiresIn = '3d';
    const payload = {
      sub: userId,
      iat: Date.now()
    };
    const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    };
  }
}
