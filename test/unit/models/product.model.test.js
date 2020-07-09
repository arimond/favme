const assert = require('chai').assert;
const productModel = require('../../../app/models/product.model');

describe('Test productModel', () => {
    describe('Create the Product', () => {
        it('should create a Product in the database', () => {
            myTestProduct={
                name: "Nachhilfe Englisch",
                image: "url/to/image/image123123123213.png",
                price: 41000,
                income: 40000,
                fee: 1000,
                currency: "eur"
            }

            productModel.create(2,myTestProduct, (err, res) => {
                assert.isNull(err);
                assert.isNotNull(res);
            });
        });
    });
    
    
    describe('Find products', () => {
        it('should get the list of products by userid', () => {
            productModel.getAllById(1, (err,res) => {
                assert.isArray(res);
                assert.property(res[0],"productId");
                assert.property(res[0],"userId");
                assert.property(res[0],"name");
                assert.property(res[0],"image");
                assert.property(res[0],"price");
                assert.property(res[0],"income");
                assert.property(res[0],"fee");
                assert.property(res[0],"currency");
                assert.isNull(err);
            });
        });
    });
    
    
    describe('Find product', () => {
        it('should return one product by its productId and userId', () => {
            productModel.getById(1, 5, (err,res) => {
                assert.isNotNull(res);
                assert.property(res,"productId");
                assert.property(res,"userId");
                assert.property(res,"name");
                assert.property(res,"image");
                assert.property(res,"price");
                assert.property(res,"income");
                assert.property(res,"fee");
                assert.property(res,"currency");
                assert.isNull(err);    
            });
        });
        it('should return error not found, because product does not exist in the database', () => {
            productModel.getById(1, 30,  (err,res) => {
                assert.isNull(res);
                assert.isNotNull(err);
                assert.propertyVal(err,"kind","not_found");
            });
        });
    });
    
    
    describe('Update Product', () => {
        myTestProduct={
            name: "Nachhilfe Englisch",
            image: "path/to/image.png",
            price: 2000,
            income: 1900,
            fee: 100,
            currency: "eur"
        }
        it('should update the product', () => {
            productModel.updateById(1, 6, myTestProduct, (err,res) => {
                assert.isNull(err);
                assert.isNotNull(res);
            });
        });
        it('should return error not_found because the product does not exist', () => {
            productModel.updateById(1, 20, myTestProduct, (err,res) => {
                assert.isNull(res);
                assert.propertyVal(err,"kind","not_found");
            });
        });
    });
    
    
    describe('Delete product', () => {
        it('should return result deleted_product', () => {
            productModel.deleteById(1, 5,  (err,res) => {
                assert.isNull(err);
                assert.propertyVal(res,"kind","deleted_product");
            });
        });
        it('should return error not_found because the product does not exist', () => {
            productModel.deleteById(1, 20, (err,res) => {
                assert.isNull(res);
                assert.propertyVal(err,"kind","not_found");
            });
        });
    });
});