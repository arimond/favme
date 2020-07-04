module.exports = class InvalidCredentials extends Error {
    constructor(){
        super();
        this.status = 401;
        this.message = "Invalid User Credentials";
    }
}