module.exports = class InvalidPriceError extends Error {
    constructor(){
        super();
        const maxPrice = process.env.MAX_PRICE * 100
        this.status = 401;
        this.message = `Price should be less then ${maxPrice}`;
    }
}