const assert = require('chai').assert;
const userModel = require('../../../app/models/user.model');

describe('Test UserModel', () => {
    describe('Create the User', () => {
        it('should create a user in the database', () => {
            myTestUser={
                username: "Peeedqdaadseddefseeeere",
                hash: "oaisdadaddqodsfsaseddhiaeh",
                salt: "sajhaskddadqadsjesed",
                email: "anuswunaqeasd@getiei"
            }
            const user = new userModel(myTestUser);

            userModel.create(user, (err, res) => {
                assert.isNotNull(res);
                assert.isNull(err);
            });
        });
        it('should return error because the user already exists', () => {
            myTestUser={
                username: "Peeedqdaadseddefseeeere",
                hash: "oaisdadaddqodsfsaseddhiaeh",
                salt: "sajhaskddadqadsjesed",
                email: "peer@mymail.com"
            }
            userModel.create(myTestUser, (err, res) => {
                assert.isNull(res);
                assert.isNotNull(err);
            });
        });
    });
    describe('Find User by Email', () => {
        it('should get the user by email', () => {
            userModel.getByEmail("peer@mymail.com", (err,res) => {
                assert.isNotNull(res);
                assert.property(res,"username");
                assert.property(res, "hash");
                assert.property(res, "salt");
                assert.property(res, "email");
                assert.isNull(err);
            });
        });
        it('should return error not_found because the user does not exist in the database', () => {
            userModel.getByEmail("emailnotexisting@mymail.com", (err, res) => {
                assert.isNull(res);
                assert.propertyVal(err,"kind", "not_found");
            });
        });
    });
    describe('Find the balance of a User', () => {
        it('should get the user by the userId', () => {
            userModel.getBalanceById(1, (err,res) => {
                assert.isNotNull(res);
                assert.property(res,"userId");
                assert.property(res, "balance");
                assert.isNull(err);
            });
        });
    });
    describe('Add value to the balance of a User', () => {
        it('should add 10 to the balance of the user by the userId, the result should be 10', () => {
            let actual = 0;
            userModel.getBalanceById(1, (err, res) => {
                assert.isNull(err);
                actual = res.balance;
            });
            userModel.addBalanceById(1,10, (err,res) => {
                assert.isNull(err);
                assert.propertyVal(res, "kind", "added_balance");
                userModel.getBalanceById(1, (err, res) => {
                    assert.isNull(err);
                    assert.equal(actual+10,res.balance);
                });
            });
        });
    });
});
