const assert = require('chai').assert;
const profileModel = require('../../../app/models/profile.model');

describe('Test profileModel', () => {
    describe('Find profile by userId', () => {
        it('should get the profile by the userId', () => {
            profileModel.getById(1, (err,res) => {
                assert.isNull(err);
                assert.property(res,"userId");
                assert.property(res,"email");
                assert.property(res, "profession");
                assert.property(res, "phone");
                assert.property(res, "phone");
                assert.property(res, "description");
                assert.property(res, "image");
            });
        });
        it('should return error not_found because the profile does not exist in the database', () => {
            profileModel.getById(1000, (err, res) => {
                assert.isNull(res);
                assert.isNotNull(err);
            });
        });
    });

    describe('Update profile by userId', () => {
        it('should update the profile by the userId', () => {
            let myTestProfile = new profileModel({
                email: "mynewmail@mail.com",
                profession: "Tischler",
                phone: "017562548162",
                description: "Hallo dies ist meine neue Beschreibung",
                image: "yesjo/neuer/pfad/zum/image.png"
            })
            profileModel.updateById(1, myTestProfile, (err,res) => {
                assert.isNotNull(res);
                assert.isNull(err);
            });
        });
    });
});
