const chai = require('chai');
const sinon = require('sinon');
const passport = require('passport');
const chaiHttp = require('chai-http');
var app;
const { expect } = chai;

chai.use(chaiHttp);
describe('Test Payout Routes', () => {
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

    describe("Test Get Payouts", () => {
        it('Should return 200 Success and a list of all payouts', (done) => {
            chai
                .request(app)
                .get('/api/users/payouts')
                .send()
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('payoutId');
                    expect(res.body[0]).to.have.property('bankaccountId');
                    expect(res.body[0]).to.have.property('amount');
                    expect(res.body[0]).to.have.property('status');
                    expect(res.body[0]).to.have.property('requestDate');
                    expect(res.body[0]).to.have.property('approveDate');
                    expect(res.body[0]).to.have.property('iban');
                    expect(res.body[0]).to.have.property('beneficiary');
                    done();
                });
        });
        it('Should return 200 Success and the 5 latest payouts', (done) => {
            chai
                .request(app)
                .get('/api/users/payouts?limit=5')  // Query Param limit=5
                .send()
                .end((err, res) => {
                    //console.log(res.body);
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).equal(5);
                    expect(res.body[0]).to.have.property('payoutId');
                    expect(res.body[0]).to.have.property('bankaccountId');
                    expect(res.body[0]).to.have.property('amount');
                    expect(res.body[0]).to.have.property('status');
                    expect(res.body[0]).to.have.property('requestDate');
                    expect(res.body[0]).to.have.property('approveDate');
                    expect(res.body[0]).to.have.property('iban');
                    expect(res.body[0]).to.have.property('beneficiary');
                    done();
                });
        });
    });
    
    describe("Test Post Payouts", () => {
        it('Should return 200 Success and the requested payout', (done) => {
            const payout = {
                amount: 20000,
                bankaccountId: 4
            };
            chai
                .request(app)
                .post('/api/users/payouts')
                .send(payout)
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('bankaccountId');
                    expect(res.body).to.have.property('payoutId');
                    expect(res.body).to.have.property('amount');
                    done();
                });
        });

        it('Should return 400 Invalid Input', (done) => {
            const payout = {
                wrongColumn: 20000,
                bankaccountId: 4
            };
            chai
                .request(app)
                .post('/api/users/payouts')
                .send(payout)
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error','Invalid Input');
                    done();
                });
        });
        
        it('Should return 401 Balance to low', (done) => {
            const payout = {
                amount: 50000000000,
                bankaccountId: 4
            };
            chai
                .request(app)
                .post('/api/users/payouts')
                .send(payout)
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error','Not enaugh Balance');
                    done();
                });
        });
    });
});
