const chai = require('chai');
const sinon = require('sinon');
const passport = require('passport');
const chaiHttp = require('chai-http');
var app;
const { expect } = chai;

chai.use(chaiHttp);
describe('Test Sell Routes', () => {
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

    describe("Test Get Sells", () => {
        it('Should return 200 Success and a list of all payouts', (done) => {
            chai
                .request(app)
                .get('/api/users/sells')
                .send()
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('sellId');
                    expect(res.body[0]).to.have.property('productId');
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('price');
                    expect(res.body[0]).to.have.property('income');
                    expect(res.body[0]).to.have.property('fee');
                    expect(res.body[0]).to.have.property('email');
                    expect(res.body[0]).to.have.property('date');
                    done();
                });
        });
        
        it('Should return 200 Success and the 5 latest payouts', (done) => {
            chai
                .request(app)
                .get('/api/users/sells?limit=5')  // Query Param limit=5
                .send()
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).equal(5);
                    expect(res.body[0]).to.have.property('sellId');
                    expect(res.body[0]).to.have.property('productId');
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('price');
                    expect(res.body[0]).to.have.property('income');
                    expect(res.body[0]).to.have.property('fee');
                    expect(res.body[0]).to.have.property('email');
                    expect(res.body[0]).to.have.property('date');
                    done();
                });
        });
    });
});
