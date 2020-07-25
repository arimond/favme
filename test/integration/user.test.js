const chai = require('chai');
const sinon = require('sinon');
const passport = require('passport');
const chaiHttp = require('chai-http');
var app;
const { expect } = chai;

chai.use(chaiHttp);
describe('Test User Routes', () => {
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
    describe('Test Post Register', () => {
        // Done callback to encure test ends befor Login test
        it('Should return 200 Success', (done) => {
            chai
                .request(app)
                .post('/api/users/register')
                .send({
                    email: 'mytestmaill@testaccountas.com',
                    username: 'mytestussserdname',
                    password: 'sicheristdasnicht'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('Should return 400 Bad Request', (done) => {
            chai
                .request(app)
                .post('/api/users/register')
                .send({
                    email: "mytestll@testaccount.com",
                    wrong: "mytestusssername",
                    password: "sicheristdasnicht"
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property("error", "Invalid Input");
                    done();
                });
        });
    });

    describe('Test Post Login', () => {
        it('Should return 200 Success', (done) => {
            chai
                .request(app)
                .post('/api/users/login')
                .send({
                    email: 'mytestmaill@testaccount.com',
                    password: 'sicheristdasnicht'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('token');
                    done();
                });
        });
        it("Should return 401 Unauthorized", (done) => {
            chai
                .request(app)
                .post('/api/users/login')
                .send({
                    email: "mytestmaill@testaccount.com",
                    password: "falschespassword"
                })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('error', 'Invalid User Credentials');
                    done();
                });
        });
    });
    describe("Test Get Balance", () => {
        it('Should return 200 Success', (done) => {
            chai
                .request(app)
                .get('/api/users/balance')
                .send()
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
    describe("Test Get Username", () => {
        it('Should return 200 Success', (done) => {
            chai
                .request(app)
                .get('/api/users/username/2')
                .send()
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});
