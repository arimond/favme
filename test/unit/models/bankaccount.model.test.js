const assert = require('chai').assert;
const bankaccountModel = require('../../../app/models/bankaccount.model');

describe('Test bankaccountModel', () => {
    describe('Create the Bankaccount', () => {
        it('should create a bankaccount in the database', () => {
            myTestBankaccount={
                country: "Deutschland",
                beneficiary: "Sinah Kolumba",
                iban: "DE41500105170123123789",
                bic: "0"
            }

            bankaccountModel.create(2,myTestBankaccount, (err, res) => {
                assert.isNotNull(res);
                assert.isNull(err);
            });
        });
    });
    
    describe('Find all bankaccounts', () => {
        it('should get the list of bankaccounts by userid, should return two bankaccounts', () => {
            bankaccountModel.getAllById(1, (err,res) => {
                assert.isArray(res);
                assert.equal(res.length, 2);
                assert.property(res[0],"bankaccountId");
                assert.property(res[0],"userId");
                assert.property(res[0],"country");
                assert.property(res[0],"beneficiary");
                assert.property(res[0],"iban");
                assert.property(res[0],"bic");
                assert.isNull(err);
            });
        });
    });
    
    describe('Find bankaccount', () => {
        it('should return one bankaccount by its id', () => {
            bankaccountModel.getById( 1, (err,res) => {
                assert.isNotNull(res);
                assert.property(res,"bankaccountId");
                assert.property(res,"userId");
                assert.property(res,"country");
                assert.property(res,"beneficiary");
                assert.property(res,"iban");
                assert.property(res,"bic");
                assert.isNull(err);    
            });
        });
        it('should return error not found, because bankaccount does not exist in the database', () => {
            bankaccountModel.getById( 10,  (err,res) => {
                assert.isNull(res);
                assert.isNotNull(err);
                assert.propertyVal(err,"kind","not_found");
            });
        });
    });


    describe('Update bankaccount', () => {
        myTestBankaccount={
            country: "Deutschland",
            beneficiary: "Peer Hofreiter",
            iban: "DE415001051712323123789",
            bic: "1958236344"
        }
        it('should update the bankaccount', () => {
            bankaccountModel.updateById(2, 3, myTestBankaccount, (err,res) => {
                assert.isNull(err);
                assert.isNotNull(res);
            });
        });
        it('should return error not_found because the bankaccount does not exist', () => {
            bankaccountModel.updateById(1, 20, myTestBankaccount, (err,res) => {
                assert.isNull(res);
                assert.propertyVal(err,"kind","not_found");
            });
        });
    });


    describe('Delete bankaccount', () => {
        it('should return result deleted_bankaccount', () => {
            bankaccountModel.deleteById(2, 4,  (err,res) => {
                assert.isNull(err);
                assert.propertyVal(res,"kind","deleted_bankaccount");
            });
        });
        it('should return error not_found because the bankaccount does not exist', () => {
            bankaccountModel.deleteById(1, 20, (err,res) => {
                assert.isNull(res);
                assert.propertyVal(err,"kind","not_found");
            });
        });
    });
});