module.exports = class InvalidInputError extends Error {
    constructor(){
        super();
        this.status = 400;
        this.message = "Invalid Input";
    }
}