const chai = require('chai');
const sinon = require('sinon');
const passport = require('passport');
const chaiHttp = require('chai-http');
var app;
const { expect } = chai;

chai.use(chaiHttp);
describe('Test Bankaccount Routes', () => {
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

    describe("Test Get Bankaccounts", () => {
        it('Should return 200 Success and a list of bankaccounts', (done) => {
            chai
                .request(app)
                .get('/api/users/bankaccounts')
                .send()
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.equal(4);
                    expect(res.body[0]).to.have.property('bankaccountId');
                    expect(res.body[0]).to.have.property('userId');
                    expect(res.body[0]).to.have.property('country');
                    expect(res.body[0]).to.have.property('beneficiary');
                    expect(res.body[0]).to.have.property('iban');
                    expect(res.body[0]).to.have.property('bic');
                    done();
                });
        });
    });

    describe("Test Post Bankaccounts", () => {
        it('Should return 200 Success and a the created bankaccount', (done) => {
            const bankaccount = {
                country: "Deutschland",
                beneficiary: "Max Mustermann",
                iban: "DE123028719837121827123",
                bic: "1089237182739"
            };
            chai
                .request(app)
                .post('/api/users/bankaccounts')
                .send(bankaccount)
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('bankaccountId');
                    expect(res.body).to.have.property('country');
                    expect(res.body).to.have.property('beneficiary');
                    expect(res.body).to.have.property('iban');
                    expect(res.body).to.have.property('bic');
                    done();
                });
        });
        it('Should return 400 Invalid Input', (done) => {
            const bankaccount = {
                country: "Deutschland",
                wrongcolumn: "Max Mustermann",
                iban: "DE123028719837121827123",
                bic: "1089237182739"
            };
            chai
                .request(app)
                .post('/api/users/bankaccounts')
                .send(bankaccount)
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error','Invalid Input');
                    done();
                });
        });
    });
    describe("Test Put Bankaccounts", () => {
        it('Should return 200 Success and return the updated bankaccount', (done) => {
            const bankaccount = {
                country: "ChangedValue",
                beneficiary: "Max Mustermann",
                iban: "DE123028719837121827123",
                bic: "1089237182739"
            };
            chai
                .request(app)
                .put('/api/users/bankaccounts/3')
                .send(bankaccount)
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res).to.be.a('object');
                    expect(res.body).to.have.property('bankaccountId');
                    expect(res.body).to.have.property('country');
                    expect(res.body).to.have.property('beneficiary');
                    expect(res.body).to.have.property('iban');
                    expect(res.body).to.have.property('bic');
                    done();
                });
        });
        it('Should return 400 Invalid Input', (done) => {
            const bankaccount = {
                country: "Ghana",
                beneficiary: "Max Mustermann",
                iban: "DE123028719837121827123",
                bic: 1089237182739  //Should be a String 
            };
            chai
                .request(app)
                .put('/api/users/bankaccounts/3')
                .send(bankaccount)
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(400);
                    expect(res).to.be.a('object');
                    expect(res.body).to.have.property('error','Invalid Input');
                    done();
                });
        });
    });
    describe("Test Delete Bankaccounts", () => {
        it('Should return 200 The ressource has been deleted successfully', (done) => {
            chai
                .request(app)
                .delete('/api/users/bankaccounts/5')
                .send()
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('success',true);
                    expect(res.body).to.have.property('message','The ressource has been deleted');
                    done();
                });
        });
        it('Should return 404 The requested Ressource does not exist', (done) => {
            chai
                .request(app)
                .delete('/api/users/bankaccounts/20')
                .send()
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(404);
                    expect(res).to.be.a('object');
                    expect(res.body).to.have.property('error','Ressource not found');
                    done();
                });
        });
    });
});
