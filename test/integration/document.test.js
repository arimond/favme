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

    describe("Test Post Documents", () => {
        it('Should return 200 Success and a the created document', (done) => {
            chai
                .request(app)
                .post('/api/users/documents')
                .field('subject', 'bankcard')
                .attach('image', __dirname + '/../../testImages/testImage.jpeg', 'TestImageName')
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('success',true);
                    expect(res.body).to.have.property('message','The ressource has been created');
                    done();
                });
        });
        it('Should return 400 Invalid Input', (done) => {
            chai
                .request(app)
                .post('/api/users/documents')
                .field('wrongInput', 'Nachhile Mathe')
                .attach('image', __dirname + '/../../testImages/testImage.jpeg', 'TestImageName')
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error','Invalid Input');
                    done();
                });
        });
    });
});
