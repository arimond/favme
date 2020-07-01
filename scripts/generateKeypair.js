require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');

function genKeyPair() {
    // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // bits - standard for RSA keys
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1" 
            format: 'pem' // Most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
        }
    });

    // Create the public key 
    fs.writeFileSync(__dirname+'/../private/public_key.pem', keyPair.publicKey); 
    
    // Create the private key
    fs.writeFileSync(__dirname+'/../private/private_key.pem', keyPair.privateKey);
}

// Generate the keypair
genKeyPair();