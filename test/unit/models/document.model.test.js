const assert = require('chai').assert;
const documentModel = require('../../../app/models/document.model');

describe('Test documentModel', () => {
    describe('Create the document', () => {
        it('should create a document in the database', () => {
            myTestDocument={
                subject: 'bankcard',
                image: 'urlToImage'
            };
            documentModel.create(1,myTestDocument, (err, res) => {
                assert.isNull(err);
                assert.isNotNull(res);
            });
        });
    });
});
