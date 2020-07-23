E-Commerce Backend Favme

SETUP:

Database:
create a mysql database and use the .env file to specify host, port, database and user. Then run the npm script command createTestDatabase

Authentification with JSON Webtokens:
run the generateKeypair Scripts for generating Public and Private Key for the JSON Webtoken encryption

Stripe:

Configure Stripe Payments:
Get your StripeSecretKey from the Stripe Dashboard and put it into private/stripeSecretKey.txt

Configure Stripe Webhook:
For testing: 
Get your endpointSecret from the stripe-cli after logging in and put it into private/endpointSecret.txt. This Key is used for validating the Stripe Signature of your Webhook endpoint.

For Production:
Get your endpointSecret from the Stripe Dashboard, after configuring your webhook Endpoint in the stripe dashboard



HTTPS Certificate:
run the createCertificate script to generate server private key and the server certificate