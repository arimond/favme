const fs = require('fs');
const chai = require('chai');
const sinon = require('sinon');
const passport = require('passport');
const chaiHttp = require('chai-http');
var app;
const { expect } = chai;

chai.use(chaiHttp);
describe('Test Product Routes', () => {
    beforeEach((done) => {
        this.authenticate = passport.authenticate = sinon.stub(passport, 'authenticate')
            .returns(
                (req, res, next) => {
                    const user = { userId: 2 }
                    req.user = user;
                    next();
                }
            );
        // Server has to be required after inizializing the sinon stub to replace the passport middleware
        app = require('../../server');
        done();
    });
    afterEach((done) => {
        this.authenticate.restore();
        done();
    });

    describe("Test Get Products", () => {
        it('Should return 200 Success and a list of products', (done) => {
            chai
                .request(app)
                .get('/api/users/1/products')
                .send()
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.equal(2);
                    expect(res.body[0]).to.have.property('productId');
                    expect(res.body[0]).to.have.property('userId');
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('description');
                    expect(res.body[0]).to.have.property('image');
                    expect(res.body[0]).to.have.property('price');
                    expect(res.body[0]).to.have.property('income');
                    expect(res.body[0]).to.have.property('fee');
                    expect(res.body[0]).to.have.property('currency');
                    done();
                });
        });
    });

    describe("Test Post Products", () => {
        it('Should return 200 Success and a the created bankaccount', (done) => {
            chai
                .request(app)
                .post('/api/users/products')
                .field('name', 'Nachhile Mathe')
                .field('price', '3000')
                .field('currency', 'eur')
                .field('description', 'Ich bin mal wieder eine Beschreibung')
                .attach('image', __dirname + '/../../testImages/testImage.jpeg', 'TestImageName')
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('productId');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('image');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('income');
                    expect(res.body).to.have.property('fee');
                    expect(res.body).to.have.property('currency');
                    done();
                });
        });

        it('Should return 400 Invalid Input', (done) => {
            const product = {
                country: "Deutschland",
                wrongcolumn: "Max Mustermann",
                iban: "DE123028719837121827123",
                bic: "1089237182739",
                image: "noimage"
            };
            chai
                .request(app)
                .post('/api/users/products')
                .send(product)
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error', 'Invalid Input');
                    done();
                });
        });
    });

    describe("Test Put Products", () => {
        it('Should return 200 Success and return the updated product', (done) => {
            chai
                .request(app)
                .put('/api/users/products/7')
                .field('name', 'Klavierunterricht Online')
                .field('price', '30000')
                .field('currency', 'eur')
                .field('description', 'Ich bin eine neue Beschreibung und mein Wert soll sich aendern')
                .attach('image', __dirname + '/../../testImages/testImage.jpeg', 'TestImageName')
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('productId');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('image');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('income');
                    expect(res.body).to.have.property('fee');
                    expect(res.body).to.have.property('currency');
                    done();
                });
        });

        it('Should return 400 Invalid Input', (done) => {
            chai
                .request(app)
                .put('/api/users/products/7')
                .field('fieldDoesNotExist', 'Klavierunterricht Online') //Field is invalid
                .field('price', '30000')
                .field('currency', 'eur')
                .field('description', 'Ich bin eine neue Beschreibung und mein Wert soll sich aendern')
                .attach('image', __dirname + '/../../testImages/testImage.jpeg', 'TestImageName')
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error', 'Invalid Input');
                    done();
                });
        });
    });

    describe("Test Delete Products", () => {
        it('Should return 200 The ressource has been deleted successfully', (done) => {
            chai
                .request(app)
                .delete('/api/users/products/10')
                .send()
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('message', 'The ressource has been deleted');
                    done();
                });
        });
        
        it('Should return 404 The requested Ressource does not exist', (done) => {
            chai
                .request(app)
                .delete('/api/users/products/20')
                .send()
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(404);
                    expect(res).to.be.a('object');
                    expect(res.body).to.have.property('error', 'Ressource not found');
                    done();
                });
        });
    });
});
