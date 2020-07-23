const assert = require('chai').assert;
const customerModel = require('../../../app/models/customer.model.js');

describe('Test customerModel', () => {
    describe('Create the customer', () => {
        it('should create a customer in the database', () => {
            myTestCustomer={
                email: "peter@mymail.com"
            };
            customerModel.create(myTestCustomer, (err, res) => {
                assert.isNull(err);
                assert.isNotNull(res);
                assert.property(res,'customerId');
                assert.property(res, 'email');
            });
        });
        it('should return error customer already exists', () => {
            myTestCustomer={
                email: "customneruno@gmail.com"
            };
            customerModel.create(myTestCustomer, (err, res) => {
                assert.isNull(res);
                assert.propertyVal(err, 'kind', 'email_already_exists');
            });
        });
    });
    describe('Get the customer by email', () => {
        it('should get a customer', () => {
            customerModel.getByMail('customneruno@gmail.com', (err, res) => {
                assert.isNull(err);
                assert.isNotNull(res);
                assert.property(res,'customerId');
            });
        });
        it('should return error not found', () => {
            customerModel.getByMail('customneruasdasdasdano@gmail.com', (err, res) => {
                assert.isNull(res);
                assert.propertyVal(err, 'kind', 'not_found');
            });
        });
    });
});
