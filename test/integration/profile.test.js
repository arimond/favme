const chai = require('chai');
const sinon = require('sinon');
const passport = require('passport');
const chaiHttp = require('chai-http');
var app;
const { expect } = chai;

chai.use(chaiHttp);
describe('Test Profile Routes', () => {
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

    describe("Test Get Profile", () => {
        it('Should return 200 Success and the profile of the user', (done) => {
            chai
                .request(app)
                .get('/api/users/1/profile')
                .send()
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('userId');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('profession');
                    expect(res.body).to.have.property('phone');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('image');
                    done();
                });
        });
        it('Should return 404 Ressource not found', (done) => {
            chai
                .request(app)
                .get('/api/users/13/profile')
                .send()
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('error','Ressource not found')
                    done();
                });
        });
    });

    
    describe("Test Put Profile", () => {
        it('Should return 200 Success and return the updated profile', (done) => {
            chai
                .request(app)
                .put('/api/users/profile')
                .field('email','mytestemail@mailproofider.com')
                .field('profession','Model')
                .field('description','Ich bin ein Cam Model')
                .field('phone','01756187213')
                .attach('image',__dirname+'/../../testImages/testImage.jpeg','TestImage')
                .end((err, res) => {
                    expect(err).to.be.a('null');
                    expect(res).to.have.status(200);
                    expect(res).to.be.a('object');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('profession');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('image');
                    done();
                });
        });
        it('Should return 400 Invalid Input', (done) => {
            chai
                .request(app)
                .put('/api/users/profile')
                .field('wrongColumn','mytestemail@mailproofider.com')
                .field('profession','Model')
                .field('description','Ich bin ein Cam Model')
                .field('phone','01756187213')
                .attach('image',__dirname+'/../../testImages/testImage.jpeg','TestImage')
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
