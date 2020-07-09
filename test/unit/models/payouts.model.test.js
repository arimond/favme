const assert = require('chai').assert;
const payoutModel = require('../../../app/models/payout.model');

describe('Test payoutModel', () => {
    describe('Create the payout', () => {
        myTestPayout={
            bankaccountId: 3,
            amount: 40000,
        }
        it('should create a payout in the database', () => {
            payoutModel.create(2,myTestPayout, (err, res) => {
                assert.isNull(err);
                assert.isNotNull(res);
            });
        });
    });

    
    describe('Find payouts', () => {
        it('should get the list of payouts by userid', () => {
            payoutModel.getAllById(1, (err,res) => {
                assert.isArray(res);
                assert.property(res[0],"payoutId");
                assert.property(res[0],"status");
                assert.property(res[0],"amount");
                assert.property(res[0],"requestDate");
                assert.property(res[0],"approveDate");
                assert.property(res[0],"bankaccountId");
                assert.property(res[0],"iban");
                assert.property(res[0],"beneficiary");
                assert.isNull(err);
            });
        });
    });
        
    describe('Find latest Payouts', () => {
        it('should get the list of payouts by userid', () => {
            payoutModel.getLatestById(1, 1, (err,res) => {
                assert.isArray(res);
                assert.property(res[0],"payoutId");
                assert.property(res[0],"status");
                assert.property(res[0],"amount");
                assert.property(res[0],"requestDate");
                assert.property(res[0],"approveDate");
                assert.property(res[0],"bankaccountId");
                assert.property(res[0],"iban");
                assert.property(res[0],"beneficiary");
                assert.isNull(err);
            });
        });
    });
});