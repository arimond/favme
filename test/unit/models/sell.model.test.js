const assert = require('chai').assert;
const sellModel = require('../../../app/models/sell.model');

describe('Test sellModel', () => {
    describe('Create the sell', () => {
        it('should create a sell in the database', () => {
            myTestSell={
                productId: 4,
                customerId: 1,
            }

            sellModel.create(myTestSell, (err, res) => {
                assert.isNull(err);
                assert.isNotNull(res);
            });
        });
    });

    describe('Find Sells', () => {
        it('should get the list of sells by userid', () => {
            sellModel.getAllById(1, (err,res) => {
                assert.isArray(res);
                assert.property(res[0],"sellId");
                assert.property(res[0],"productId");
                assert.property(res[0],"name");
                assert.property(res[0],"price");
                assert.property(res[0],"income");
                assert.property(res[0],"fee");
                assert.property(res[0],"email");
                assert.property(res[0],"date");
                assert.isNull(err);
            });
        });
    });

    describe('Find the latest Sells', () => {
        it('should get the latest list of sells by userid', () => {
            sellModel.getLatestById(1,1, (err,res) => {
                assert.isArray(res);
                assert.equal(res.length, 1);
                assert.property(res[0],"sellId");
                assert.property(res[0],"productId");
                assert.property(res[0],"name");
                assert.property(res[0],"price");
                assert.property(res[0],"income");
                assert.property(res[0],"fee");
                assert.property(res[0],"email");
                assert.property(res[0],"date");
                assert.isNull(err);
            });
        });
    });
});