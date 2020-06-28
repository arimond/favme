const assert = require('chai').assert;
const customerModel = require('../../app/models/customer.model');

describe('Test customerModel', () => {
    describe('Create the customer', () => {
        it('should create a customer in the database', () => {
            myTestCustomer={
                email: "test@mymail.com"
            }
            customerModel.create(myTestCustomer, (err, res) => {
                assert.isNull(err);
                assert.isNotNull(res);
            });
        });
    });
});
