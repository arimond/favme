module.exports = class NotEnaughBalanceError extends Error {
    constructor(){
        super();
        this.status = 400;
        this.message = "Not enaugh Balance";
    }
}