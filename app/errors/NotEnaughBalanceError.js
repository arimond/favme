module.exports = class NotEnaughBalanceError extends Error {
    constructor(){
        super();
        this.status = 401;
        this.message = "Not enaugh Balance";
    }
}