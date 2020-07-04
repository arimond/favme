const app = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = chai;

chai.use(chaiHttp);
describe("Test User Routes", () => {
    describe("Test Post Register", () => {
        it("Should return 200 Success", () => {
            chai
            .request(app)
            .post('/api/users/register')
            .send({
                email: "mytestmaill@testaccount.com",
                username: "mytestusssername",
                password: "sicheristdasnicht"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
            });
        });

        it("Should return 400 Bad Request", () => {
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
                expect(res.body).to.have.property("error","Invalid Input");
            });
        });
    });
    
    describe("Test Post Login", () => {
        it("Should return 200 Success", () => {
            chai
            .request(app)
            .post('/api/users/login')
            .send({
                email: "mytestmaill@testaccount.com",
                password: "sicheristdasnicht"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('token');
                console.log(res);
            });
        });
    });
});

