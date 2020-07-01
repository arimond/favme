const app = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = chai;

chai.use(chaiHttp);
describe("Test User Routes", () => {
    describe("Test Post Register", () => {
        /*
        it("Should return 200 Success", () => {
            chai
            .request(app)
            .post('/api/users/register')
            .end((err, res) => {
                expect(res).to.have.status(200);
            });
        });
        */
    });
});

