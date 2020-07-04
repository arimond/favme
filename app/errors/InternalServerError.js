module.exports = class InternalServerError extends Error{
    constructor(){
        super();
        this.status = 404;
        this.message = "Internal Server Error";
    }
}